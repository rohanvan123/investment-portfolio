import { DataEntry, StockList } from "@/types/types";

export const formatDate = (date: string) => {
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return (
    (month[0] == "0" ? month.substring(1) : month) +
    "/" +
    (day[0] == "0" ? day.substring(1) : day)
  );
};

export const getAggregateData = (
  portfolioData: StockList[],
  userShares: Map<string, number>
) => {
  const data: DataEntry[] = [];
  for (let i = 0; i < portfolioData[0]?.sharePrices.length; i++) {
    let dailyPortfolioSize = 0;
    for (let j = 0; j < portfolioData.length; j++) {
      dailyPortfolioSize +=
        portfolioData[j].sharePrices[i].price *
        Number(userShares.get(portfolioData[j].tickerName));
    }

    const entry: DataEntry = {
      name: formatDate(portfolioData[0].sharePrices[i].date),
      value: Number(dailyPortfolioSize.toFixed(2)),
    };
    data.push(entry);
  }
  return data;
};

export const getTickerData = (
  portfolioData: StockList[],
  userShares: Map<string, number>,
  tickerName: string
) => {
  const data: DataEntry[] = [];
  const tickerShares = Number(userShares ? userShares.get(tickerName) : 0);
  const tickerIndex = portfolioData.findIndex(
    (entry) => entry.tickerName === tickerName
  );

  for (let i = 0; i < portfolioData[tickerIndex]?.sharePrices.length; i++) {
    let dailyPortfolioSize =
      portfolioData[0].sharePrices[i].price * tickerShares;
    const entry: DataEntry = {
      name: formatDate(portfolioData[0].sharePrices[i].date),
      value: Number(dailyPortfolioSize.toFixed(2)),
    };
    data.push(entry);
  }
  return data;
};

export const getMaxDataEntry = (arr: DataEntry[]) => {
  let max = arr.length === 0 ? 100 : arr[0].value;
  for (let i = 0; i < arr.length; i++) {
    max = max < arr[i].value ? arr[i].value : max;
  }
  return max;
};

export const getMinDataEntry = (arr: DataEntry[]) => {
  let min = arr.length === 0 ? 0 : arr[0].value;
  for (let i = 0; i < arr.length; i++) {
    min = min > arr[i].value ? arr[i].value : min;
  }
  return min;
};
