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
        shares: shares,
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
    ]);
    setUserShares(userMap);
  }, []);

  return { userShares };
}
