export interface StockDataPoint {
  date: string;
  price: number;
}

export interface StockList {
  tickerName: string;
  sharePrices: StockDataPoint[];
}

export interface ChartProps {
  portfolioData: StockList[];
  userShares: Map<string, number>;
}

export interface StockLineChartProps {
  graphData: DataEntry[];
  chartOffset: number;
  lineColor: string;
}

export interface StockModuleProps {
  portfolioData: StockList[];
  userShares: Map<string, number>;
  tickerList: string[];
}

export interface DataEntry {
  name: string;
  value: number;
}
export interface UserProfile {
  firstName: string;
  lastName: string;
  uid: string;
  email: string;
  shareData: { symbol: string; quantity: number }[];
}

const testData = {
  id: 1,
  firstName: "Rohan",
  lastName: "Vanjani",
  userName: "rohanvanj21",
  creationDate: "2023-07-27",
  shareData: [
    { symbol: "GOOG", quantity: 2.3 },
    { symbol: "AAPL", quantity: 1.6 },
    { symbol: "BABA", quantity: 2 },
    { symbol: "TSLA", quantity: 3 },
  ],
};
