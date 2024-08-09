'use client';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import db from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { toast } from 'sonner';
import moment from 'moment';
import { Loader } from 'lucide-react';

const AddExpense = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  /*
   * used to add new expense
   * */
  const addNewExpense = async (e) => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format('DD-MM-YYYY'),
      })
      .returning({ insertedId: Budgets.id });

    console.log(result);
    if (result) {
      refreshData();
      setAmount('');
      setName('');
      setLoading(false);
      toast.success('Expense added ');
    } else {
      setLoading(false);
      toast.error('could not add Budget');
    }
  };
  return (
    <div className="border p-5 rounded-lg ">
      <h2 className="font-bold text-lg"> Add Expense</h2>
      <div className="mt-2 ">
        <h2 className="font-medium my-1 text-primary">Expense Name</h2>
        <Input
          placeholder="e.g:Dining"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mt-2 ">
        <h2 className="font-medium my-1 text-primary">Expense Amount</h2>
        <Input
          placeholder="$0.00"
          value={amount}
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        className="mt-3 w-full"
        onClick={() => {
          addNewExpense();
        }}
      >
        {loading ? <Loader className="animate-spin" /> : 'Add Expense'}
      </Button>
    </div>
  );
};
export default AddExpense;
