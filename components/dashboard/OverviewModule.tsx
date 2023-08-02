import { StockModuleProps } from "@/types/types";
import { FC } from "react";
import DashboardModule from "./DashboardModule";
import StockPieChart from "../charts/StockPieChart";
import LoadingContainter from "../LoadingContainer";
import { useUserData } from "@/hooks/user";

const OverviewModule: FC<StockModuleProps> = ({
  portfolioData,
  userShares,
  tickerList,
}) => {
  return (
    <DashboardModule>
      <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
        Portfolio Overview
      </span>
      {portfolioData.length !== 0 ? (
        <div className="flex flex-row justify-between mt-[20px] ml-[40px]">
          <StockPieChart
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

export default OverviewModule;
