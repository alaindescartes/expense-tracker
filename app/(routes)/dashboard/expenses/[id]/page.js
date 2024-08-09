'use client';
import { Budgets, Expenses } from '@/utils/schema';
import db from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '@/app/(routes)/dashboard/budgets/_components/BudgetItem';
import AddExpense from '@/app/(routes)/dashboard/expenses/_components/AddExpense';
import ExpenseListTable from '@/app/(routes)/dashboard/expenses/_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pen, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '@/app/(routes)/dashboard/expenses/_components/EditBudget';
import NotFound from '@/app/not-found';

const ExpensePage = ({ params }) => {
  const { id } = params;
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  /*
   * Get Budget info from the database
   * */
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpending: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, id))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpenses();
  };

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  /*
   * Get expenses from the database
   * */
  const getExpenses = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id));
    setExpenses(result);
    console.log(result);
    console.log(id + 'exe');
  };

  /*
   * deletes an budget
   * */
  const deleteBudget = async () => {
    const childExpense = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, id))
      .returning();

    if (childExpense) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, id))
        .returning();
      if (result) {
        toast.success('Budget deleted successfully.');
        router.push('/dashboard/budgets');
      } else {
        toast.error('Could not delete budget.');
        return <NotFound />;
      }
      console.log(result);
    }
  };
  return (
    <div className="p-10">
      <h2 className="flex items-center justify-between text-2xl font-bold mb-5 gap-4">
        <span className="flex items-center gap-2 group">
          <Button
            onClick={() => router.back()}
            className="bg-transparent hover:bg-transparent"
          >
            <ArrowLeft className="font-bold text-primary text-2xl transform transition-transform duration-300 group-hover:-translate-x-2" />
          </Button>
          My Expenses
        </span>

        <div className="flex items-center gap-5">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-700">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this expense.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteBudget();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="flex flex-col gap-8">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div
            className="h-[150px]
         w-full bg-slate-200 animate-pulse"
          ></div>
        )}
        <AddExpense
          budgetId={id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expenseList={expenses}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};
export default ExpensePage;
