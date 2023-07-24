import { usePortfolioData, useShareData } from "@/hooks/portfolios";
import { StockList } from "@/types/types";
import React, { use } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface DataEntry {
  name: string;
  value: number;
}

const createPieChartData = (
  portfolioData: StockList[],
  userShares: Map<string, number>
) => {
  const data: DataEntry[] = [];
  for (let i = 0; i < portfolioData.length; i++) {
    const stockValue =
      Number(
        portfolioData[i].shares[portfolioData[i].shares.length - 1].price
      ) * Number(userShares.get(portfolioData[i].tickerName));
    const entry: DataEntry = {
      name: portfolioData[i] ? portfolioData[i].tickerName : "",
      value: stockValue,
    };
    data.push(entry);
  }
  return data;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

// const CustomLabel: React.FC<any> =

const StockPieChart: React.FC = () => {
  const { portfolioData } = usePortfolioData();
  const { userShares } = useShareData();
  const data = createPieChartData(portfolioData, userShares!);
  return (
    <ResponsiveContainer width={300} height={200}>
      <PieChart>
        <Pie
          data={createPieChartData(portfolioData, userShares!)}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            index,
          }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                ${data[index].value.toFixed(2)}
              </text>
            );
          }}
          innerRadius={40}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip></Tooltip>
        <Legend
          iconType="square"
          align="right"
          verticalAlign="middle"
          layout="vertical"
          width={100}
          wrapperStyle={{
            left: "300px",
            bottom: "50px",
            display: "inline-block",
            fontSize: "20px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StockPieChart;
