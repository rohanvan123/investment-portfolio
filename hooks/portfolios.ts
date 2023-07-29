import { useEffect, useState } from "react";
import mockData from "../data/stock_data.json";
import { StockDataPoint, StockList } from "@/types/types";

export function usePortfolioData() {
  const [portfolioData, setPortfolioData] = useState<StockList[]>([]);

  useEffect(() => {
    const newArr: StockList[] = mockData.map((entry) => {
      const shares: StockDataPoint[] = entry["data"].map((dataPoint) => ({
        date: String(dataPoint[0]),
        price: Number(dataPoint[7]),
      }));

      return {
        tickerName: entry["ticker"],
        sharePrices: shares,
      };
    });
    setPortfolioData(newArr);
  }, []);

  return { portfolioData };
}

export function useShareData() {
  const [userShares, setUserShares] = useState<Map<string, number>>();
  useEffect(() => {
    const userMap: Map<string, number> = new Map([
      ["GOOG", 2.3],
      ["AAPL", 1.6],
      ["TSLA", 3],
    ]);
    setUserShares(userMap);
  }, []);

  return { userShares };
}

export function useTickerList() {
  const [tickerList, setTickerList] = useState<string[]>([]);
  useEffect(() => {
    const newArr: string[] = mockData.map((entry) => entry["ticker"]);
    setTickerList(newArr);
  }, []);

  return { tickerList };
}
