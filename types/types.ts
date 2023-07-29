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

export interface DataEntry {
  name: string;
  value: number;
}
