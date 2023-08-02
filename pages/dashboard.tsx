import { usePortfolioData } from "@/hooks/portfolios";
import { useShareData, useTickerList } from "@/hooks/user";
import SummaryModule from "@/components/dashboard/SummaryModule";
import IndividualStockModule from "@/components/dashboard/IndividualStockModule";
import CummulativePerformanceModule from "@/components/dashboard/CummulativePerformaceModule";
import OverviewModule from "@/components/dashboard/OverviewModule";

const Dashboard = () => {
  const { portfolioData } = usePortfolioData();
  const { userShares } = useShareData();
  const { tickerList } = useTickerList();
  console.log(portfolioData);

  return (
    <div className="flex flex-col items-center gap-[40px]">
      <div className="flex flex-row gap-[40px]">
        <SummaryModule portfolioData={portfolioData} userShares={userShares!} />
        <IndividualStockModule
          portfolioData={portfolioData}
          userShares={userShares!}
          tickerList={tickerList}
        />
      </div>
      <div className="flex flex-row gap-[40px]">
        <CummulativePerformanceModule
          portfolioData={portfolioData}
          userShares={userShares!}
          tickerList={tickerList}
        />
        <OverviewModule
          portfolioData={portfolioData}
          userShares={userShares!}
        />
      </div>
    </div>
  );
};

export default Dashboard;
