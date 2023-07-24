export interface StockDataPoint {
  date: string;
  price: number;
}

export interface StockList {
  tickerName: string;
  shares: StockDataPoint[];
}
