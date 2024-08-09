'use client';
import { PenBox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import db from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const EditBudget = ({ budgetInfo, refreshData }) => {
  const [emoji, setEmoji] = useState();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    setEmoji(budgetInfo?.icon);
    setName(budgetInfo?.name);
    setAmount(budgetInfo?.amount);
  }, [budgetInfo]);

  const onUpdateBudget = async (e) => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emoji,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();
    if (result) {
      refreshData();
      toast.success('Budget updated successfully.');
    } else {
      toast.error('Could not update budget.');
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  size="lg"
                  className="text-lg"
                >
                  {emoji}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2 ">
                  <h2 className="font-medium my-1 text-primary">Budget Name</h2>
                  <Input
                    placeholder="e.g:Dining"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    defaultValue={budgetInfo.name}
                  />
                </div>
                <div className="mt-2 ">
                  <h2 className="text-primary font-medium my-1">
                    Budget Amount
                  </h2>
                  <Input
                    type="number"
                    placeholder="0.00$"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    defaultValue={budgetInfo.amount}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start flex items-center justify-center">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                className="mt-5 w-full"
                onClick={() => {
                  onUpdateBudget();
                }}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditBudget;
