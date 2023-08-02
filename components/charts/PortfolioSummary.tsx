import { ChartProps } from "@/types/types";
import { getAggregateData } from "@/utils/utils";
import { FC } from "react";
import DifferentialIndicator from "../DifferentialIndicator";

const PortfolioSummary: FC<ChartProps> = ({ portfolioData, userShares }) => {
  const aggregateData = getAggregateData(portfolioData, userShares);
  const portfolioValue =
    aggregateData.length !== 0
      ? aggregateData[aggregateData.length - 1].value
      : 0;
  return (
    <div className="w-[100%] text-center mt-[10px]">
      <span className="text-[60px]">
        ${" "}
        {portfolioValue.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      {aggregateData.length > 1 && (
        <div className="flex flex-row justify-evenly mt-[30px]">
          <DifferentialIndicator
            textRange=" Since Yesterday"
            prev={aggregateData[aggregateData.length - 2]}
            current={aggregateData[aggregateData.length - 1]}
          />
          <DifferentialIndicator
            textRange=" Since Last Week"
            prev={aggregateData[0]}
            current={aggregateData[aggregateData.length - 1]}
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioSummary;
