import { StockLineChartProps } from "@/types/types";
import { getMaxDataEntry, getMinDataEntry } from "@/utils/utils";
import React, { FC } from "react";
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";

const StockLineChart: FC<StockLineChartProps> = ({
  graphData,
  chartOffset,
  lineColor,
}) => {
  const maxAmount = Math.floor(getMaxDataEntry(graphData)) + chartOffset;
  const minAmount =
    Math.floor(getMinDataEntry(graphData)) - chartOffset > 0
      ? Math.floor(getMinDataEntry(graphData)) - chartOffset
      : 0;

  return (
    <ResponsiveContainer width={700} height={200}>
      <LineChart
        data={graphData}
        margin={{
          top: 0,
          right: 250,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" stroke="black" />
        <XAxis
          dataKey="name"
          padding={{ left: 0, right: 0 }}
          axisLine={{ stroke: "black", strokeWidth: 2 }}
        />
        <YAxis
          domain={[minAmount, maxAmount]}
          padding={{ top: 0, bottom: 10 }}
          axisLine={{ stroke: "black", strokeWidth: 2 }}
        />
        <Tooltip
          formatter={(value: number) => [
            `$${value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
          ]}
          cursor={{ stroke: "black", strokeWidth: 1.5 }}
        />
        <Legend />
        <Line
          name="Amount (USD)"
          type="monotone"
          dataKey="value"
          stroke={lineColor}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockLineChart;
