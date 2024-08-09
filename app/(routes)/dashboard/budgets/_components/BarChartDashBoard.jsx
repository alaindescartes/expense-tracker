import {
  Bar,
  BarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

const BarChartDashBoard = ({ budgets }) => {
  return (
    <div className="border rounded-lg p-5 h-[350px]">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width="80%" height="80%">
        <BarChart
          data={budgets}
          margin={{
            top: 7,
            bottom: 10,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpending" stackId="a" fill="#4845d2" />
          <Bar dataKey="amount" stackId="a" fill="#c3c3ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashBoard;
