import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

const CardInfo = ({ cardInfo }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const calculateCardInfo = () => {
    let total = 0;
    let totalSpend = 0;
    cardInfo.forEach((info) => {
      total += Number(info.amount);
      totalSpend += Number(info.totalSpending);
    });
    setTotalBudget(total);
    setTotalSpending(totalSpend);
  };

  useEffect(() => {
    calculateCardInfo();
  }, [cardInfo]);
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {cardInfo ? (
        <>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">${totalBudget}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spent</h2>
              <h2 className="font-bold text-2xl">${totalSpending}</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. of Budgets </h2>
              <h2 className="font-bold text-2xl">{cardInfo?.length}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="h-[150px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CardInfo;
