'use client';
import { useUser } from '@clerk/nextjs';
import CardInfo from '@/app/(routes)/dashboard/_componets/CardInfo';
import { useEffect, useState } from 'react';
import db from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashBoard from '@/app/(routes)/dashboard/budgets/_components/BarChartDashBoard';
import BudgetItem from '@/app/(routes)/dashboard/budgets/_components/BudgetItem';
import ExpenseListTable from '@/app/(routes)/dashboard/expenses/_components/ExpenseListTable';

function Page() {
  const [budgets, setBudgets] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const { user } = useUser();

  const getBudgetList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpending: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgets(result);
    getAllExpense();
  };

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  /*
   * used to get all expenses under current user
   * */
  const getAllExpense = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpenseList(result);
    console.log('expense are,', result);
  };
  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">Here's what's happening with your money</p>
      <CardInfo cardInfo={budgets} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-2">
        <div className="md:col-span-2 ">
          <BarChartDashBoard budgets={budgets} />
          <h2 className="mt-5 font-bold text-lg">Latest Expenses</h2>
          <ExpenseListTable
            expenseList={expenseList}
            refreshData={() => getBudgetList()}
          />
        </div>

        <div>
          <h2 className="font-bold text-lg">Latest Budget</h2>
          {budgets.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
