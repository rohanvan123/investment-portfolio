import { ChartProps } from "@/types/types";
import { FC } from "react";
import DashboardModule from "./DashboardModule";
import PortfolioSummary from "../charts/PortfolioSummary";
import LoadingContainter from "../LoadingContainer";

const SummaryModule: FC<ChartProps> = ({ portfolioData, userShares }) => {
  return (
    <DashboardModule>
      <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
        Summary
      </span>
      {portfolioData.length !== 0 ? (
        <div className="flex flex-row justify-between mt-[20px]">
          <PortfolioSummary
            portfolioData={portfolioData}
            userShares={userShares!}
          />
        </div>
      ) : (
        <LoadingContainter />
      )}
    </DashboardModule>
  );
};

export default SummaryModule;
