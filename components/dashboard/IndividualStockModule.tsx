import {
  ChartProps,
  DataEntry,
  StockLineChartProps,
  StockList,
} from "@/types/types";
import { ChangeEvent, FC, useEffect, useState } from "react";
import DashboardModule from "./DashboardModule";
import { getTickerData } from "@/utils/utils";
import DifferentialIndicator from "../DifferentialIndicator";
import StockLineChart from "../charts/StockLineChart";
import LoadingContainter from "../LoadingContainer";

interface IndividualStockModuleProps {
  portfolioData: StockList[];
  userShares: Map<string, number>;
  tickerList: string[];
}

const IndividualStockModule: FC<IndividualStockModuleProps> = ({
  portfolioData,
  userShares,
  tickerList,
}) => {
  const [selectedTicker, setSelectedTicker] = useState("N/A");
  const [tickerData, setTickerData] = useState<DataEntry[]>([]);

  useEffect(() => {
    if (tickerList && tickerList.length > 0) {
      setSelectedTicker(tickerList[0]);
      setTickerData(getTickerData(portfolioData, userShares, tickerList[0]));
    }
  }, [tickerList, portfolioData]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedTicker(newValue);
    setTickerData(getTickerData(portfolioData, userShares, newValue));
  };

  console.log(tickerData);

  return (
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
        {tickerData.length !== 0 && (
          <div className="mt-[20px] mr-[45px]">
            <DifferentialIndicator
              textRange=" Since Last Week"
              prev={tickerData[0]}
              current={tickerData[tickerData.length - 1]}
            />
          </div>
        )}
      </div>
      {portfolioData.length !== 0 ? (
        <div className="flex flex-row justify-between mt-[30px]">
          <StockLineChart
            graphData={tickerData}
            chartOffset={10}
            lineColor="purple"
          />
        </div>
      ) : (
        <LoadingContainter />
      )}
    </DashboardModule>
  );
};

export default IndividualStockModule;
