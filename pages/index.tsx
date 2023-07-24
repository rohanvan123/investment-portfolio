import DashboardModule from "@/components/DashboardModule";
import StockPieChart from "@/components/StockPieChart";

export default function Home() {
  return (
    <main className="font-[jaldi]">
      <div className="text-[35px] mt-[50px] ml-[50px] font-bold">
        Welcome, Rohan
      </div>
      <DashboardModule>
        <span className="ml-[20px] text-[20px] font-bold mt-[20px] inline-block">
          Portfolio Overview
        </span>
        <div className="flex flex-row justify-between mt-[20px] ml-[40px]">
          <StockPieChart />
        </div>
      </DashboardModule>
    </main>
  );
}
