import { useEffect, useState } from "react";
import mockUserData from "../data/user_data.json";
import { StockDataPoint, StockList } from "@/types/types";
import { useTickerList } from "./user";
import { getDateRange } from "@/utils/date";
import { setUserId } from "firebase/analytics";

export function useShareDataTest(tickerList: string[]) {
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const res = getDateRange();
    const startDate = res[0];
    const endDate = res[1];

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

export function usePortfolioData() {
  const { data } = useShareDataTest(useTickerList().tickerList);
  // const { data } = useShareDataTest([]);
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
