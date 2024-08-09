'use client';
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
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import db from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

const CreateBudget = ({ refreshData }) => {
  const [emoji, setEmoji] = useState('🤣');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { user } = useUser();

  /**
   *Used to create new Budget
   *
   */
  const saveBudget = async (e) => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user.primaryEmailAddress.emailAddress,
        icon: emoji,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refreshData();
      toast.success('Budget created');
    } else {
      toast.error('something went wrong');
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 mt-3
      cursor-pointer hover:shadow-lg"
          >
            <h2 className="text-3xl text-primary">+</h2>
            <h2>Create New Budget</h2>
          </div>
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
                  saveBudget();
                }}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateBudget;
