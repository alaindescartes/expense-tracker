import { Trash } from 'lucide-react';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import db from '@/utils/dbConfig';

const ExpenseListTable = ({ expenseList, refreshData }) => {
  const deleteExpense = async (expenseId) => {
    try {
      const [expenseToDelete] = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expenseId))
        .returning();

      if (expenseToDelete) {
        toast.success('Expense deleted successfully.');
        refreshData();
      } else {
        toast.error('Unable to delete expense.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the expense.');
      console.error('Delete expense error:', error);
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="mx-3">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenseList.map((item, index) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2" key={item.id}>
          <h2 className="truncate">{item.name}</h2>
          <h2 className="mx-3 truncate">${item.amount}</h2>
          <h2 className="truncate">{item.createdAt}</h2>
          <h2 className="flex ml-2">
            <Trash
              className="text-red-500 cursor-pointer"
              onClick={() => deleteExpense(item.id)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
