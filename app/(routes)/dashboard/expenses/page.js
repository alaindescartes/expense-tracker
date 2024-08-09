'use client';
import ExpenseListTable from '@/app/(routes)/dashboard/expenses/_components/ExpenseListTable';
import db from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

const Page = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);

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
    setExpenses(result);
  };

  useEffect(() => {
    getAllExpense();
  }, [user]);
  return (
    <div className="p-6">
      <ExpenseListTable expenseList={expenses} />
    </div>
  );
};
export default Page;
