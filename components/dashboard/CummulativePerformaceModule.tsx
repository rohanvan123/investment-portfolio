import { StockModuleProps } from "@/types/types";
import { FC } from "react";
import DashboardModule from "./DashboardModule";
import StockLineChart from "../charts/StockLineChart";
import { getAggregateData } from "@/utils/utils";
import LoadingContainter from "../LoadingContainer";

const CummulativePerformanceModule: FC<StockModuleProps> = ({
  portfolioData,
  userShares,
  tickerList,
}) => {
  return (
    <DashboardModule>
      <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
        Cummulative Performance
      </span>
      {portfolioData.length !== 0 ? (
        <div className="flex flex-row justify-between mt-[30px]">
          <StockLineChart
            graphData={getAggregateData(portfolioData, userShares!)}
            chartOffset={50}
            lineColor="darkgreen"
          />
        </div>
      ) : (
        <LoadingContainter />
      )}
    </DashboardModule>
  );
};

export default CummulativePerformanceModule;
