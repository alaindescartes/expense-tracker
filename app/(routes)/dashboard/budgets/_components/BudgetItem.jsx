import Link from 'next/link';
const BudgetItem = ({ budget }) => {
  const calculatePercent = () => {
    if (budget.amount === 0) return '0.00'; // Avoid division by zero
    const percentage = (budget.totalSpending / budget.amount) * 100;
    return percentage.toFixed(2);
  };

  console.log(calculatePercent());
  console.log(budget.totalSpending + '  ' + budget.amount);
  return (
    <Link href={'/dashboard/expenses/' + budget.id}>
      <div className="p-5 border rounded-lg hover:shadow-lg cursor-pointer hover:scale-105 mb-3 ">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex gap-2 items-center">
              <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
                {budget.icon}
              </h2>
              <div className="flex items-start flex-col">
                <h2 className="font-bold">{budget.name}</h2>
                <h2 className="text-xs text-gray-500">
                  {budget.totalItems} Item(s)
                </h2>
              </div>
            </div>
          </div>
          <h2 className="text-primary font-bold">${budget.amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xs text-slate-400">
              ${budget.totalSpending ? budget.totalSpending : 0} spent
            </h2>
            <h2 className="text-xs text-slate-400">
              ${budget.amount - budget.totalSpending} remaining
            </h2>
          </div>
          <div className="w-full bg-slate-400 h-2 rounded-full">
            <div
              className=" bg-primary h-2 rounded-full"
              style={{ width: `${calculatePercent()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BudgetItem;
