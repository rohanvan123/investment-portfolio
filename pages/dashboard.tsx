import DashboardModule from "@/components/DashboardModule";
import DifferentialIndicator from "@/components/DifferentialIndicator";
import PortfolioSummary from "@/components/charts/PortfolioSummary";
import StockLineChart from "@/components/charts/StockLineChart";
import StockPieChart from "@/components/charts/StockPieChart";
import { usePortfolioData } from "@/hooks/portfolios";
import { getAggregateData, getTickerData } from "@/utils/utils";
import { ChangeEvent, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useShareData, useTickerList } from "@/hooks/user";

const Dashboard = () => {
  const { portfolioData } = usePortfolioData();
  const { userShares } = useShareData();
  const { tickerList } = useTickerList();
  const [selectedTicker, setSelectedTicker] = useState(
    tickerList?.[0] ?? "N/A"
  );

  useEffect(() => {
    if (tickerList && tickerList.length > 0) {
      setSelectedTicker(tickerList[0]);
    }
  }, [tickerList]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedTicker(newValue);
  };

  console.log(portfolioData);

  return (
    <Layout>
      <div className="flex flex-col items-center gap-[40px]">
        <div className="flex flex-row gap-[40px]">
          <DashboardModule>
            <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
              Summary:
            </span>
            <div className="flex flex-row justify-between mt-[20px]">
              <PortfolioSummary
                portfolioData={portfolioData}
                userShares={userShares!}
              />
            </div>
          </DashboardModule>
          <DashboardModule>
            <div className="flex flex-row w-full justify-between">
              <select
                className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block"
                value={selectedTicker}
                onChange={handleSelectChange}
              >
                {tickerList &&
                  tickerList.map((ticker: string, idx: number) => (
                    <option key={idx}>{ticker}</option>
                  ))}
              </select>
              {getTickerData(portfolioData, userShares!, selectedTicker)
                .length !== 0 && (
                <div className="mt-[20px] mr-[45px]">
                  <DifferentialIndicator
                    textRange=" Since Last Week"
                    prev={
                      getTickerData(
                        portfolioData,
                        userShares!,
                        selectedTicker
                      )[0]
                    }
                    current={
                      getTickerData(portfolioData, userShares!, selectedTicker)[
                        getTickerData(
                          portfolioData,
                          userShares!,
                          selectedTicker
                        ).length - 1
                      ]
                    }
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row justify-between mt-[30px]">
              <StockLineChart
                graphData={getTickerData(
                  portfolioData,
                  userShares!,
                  selectedTicker
                )}
                chartOffset={10}
                lineColor="purple"
              />
            </div>
          </DashboardModule>
        </div>
        <div className="flex flex-row gap-[40px]">
          <DashboardModule>
            <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
              Cummulative Performance
            </span>
            <div className="flex flex-row justify-between mt-[30px]">
              <StockLineChart
                graphData={getAggregateData(portfolioData, userShares!)}
                chartOffset={50}
                lineColor="darkgreen"
              />
            </div>
          </DashboardModule>
          <DashboardModule>
            <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
              Portfolio Overview
            </span>
            <div className="flex flex-row justify-between mt-[20px] ml-[40px]">
              <StockPieChart
                portfolioData={portfolioData}
                userShares={userShares!}
              />
            </div>
          </DashboardModule>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
