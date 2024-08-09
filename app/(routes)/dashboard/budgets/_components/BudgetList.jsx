'use client';
import CreateBudget from '@/app/(routes)/dashboard/budgets/_components/CreateBudget';
import db from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import BudgetItem from '@/app/(routes)/dashboard/budgets/_components/BudgetItem';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const { user } = useUser();
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpending: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    // console.log(result);
    setBudgets(result); //for debugging purposes
  };

  useEffect(() => {
    user && getBudgetList();
  }, [user]);
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgets?.length > 0
          ? budgets.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
