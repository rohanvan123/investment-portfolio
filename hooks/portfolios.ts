import { useEffect, useState } from "react";
import mockUserData from "../data/user_data.json";
import { StockDataPoint, StockList } from "@/types/types";

export function useShareDataTest(tickerList: string[]) {
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const startDate = "2023-07-21";
    const endDate = "2023-07-27";

    const fetchShareData = async () => {
      const fetchDataForTicker = async (tickerIndex: number) => {
        try {
          const response = await fetch(
            `/api/${tickerList[tickerIndex]}/${startDate}/${endDate}`
          );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch data for " + tickerList[tickerIndex]
            );
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error in portfolio.ts:", error);
        }
      };

      const apiData: any[] = [];
      const fetchSequentially = async (index: number) => {
        if (index >= tickerList.length) {
          setData(apiData);
          return; // Stop the sequential fetching process
        }

        const data = await fetchDataForTicker(index);
        if (data) {
          apiData.push(data);
        }

        const delayTime = 1000;
        setTimeout(() => fetchSequentially(index + 1), delayTime);
      };

      fetchSequentially(0);
    };

    fetchShareData();
  }, [tickerList]);

  return { data };
}

export const findUserIdx = (arr: any[], userName: string) => {
  return arr.findIndex((entry) => entry["firstName"] === userName);
};

export function useShareData() {
  const [userShares, setUserShares] = useState<Map<string, number>>();
  useEffect(() => {
    const userMap: Map<string, number> = new Map();
    mockUserData[findUserIdx(mockUserData, "Rohan")]["shareData"].map(
      (sharePoint) => {
        userMap.set(sharePoint.symbol, sharePoint.quantity);
      }
    );
    setUserShares(userMap);
  }, []);

  return { userShares };
}

export function useTickerList() {
  const [tickerList, setTickerList] = useState<string[]>([]);
  useEffect(() => {
    const newArr: string[] = mockUserData[0]["shareData"].map(
      (entry) => entry.symbol
    );
    setTickerList(newArr);
  }, []);

  return { tickerList };
}

export function usePortfolioData() {
  const { data } = useShareDataTest(useTickerList().tickerList);
  const [portfolioData, setPortfolioData] = useState<StockList[]>([]);

  useEffect(() => {
    if (data) {
      const newArr: StockList[] = data.map((entry) => {
        const shares: StockDataPoint[] = entry[0]["data"].map(
          (dataPoint: any) => ({
            date: String(dataPoint[0]),
            price: Number(dataPoint[7]),
          })
        );
        return {
          tickerName: entry[0]["ticker"],
          sharePrices: shares,
        };
      });
      setPortfolioData(newArr);
    }
  }, [data]);

  return { portfolioData };
}
