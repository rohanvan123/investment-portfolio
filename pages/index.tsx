import DashboardModule from "@/components/DashboardModule";
import StockPieChart from "@/components/StockPieChart";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row">
        <DashboardModule>
          <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
            Portfolio Overview
          </span>
          <div className="flex flex-row justify-between mt-[20px] ml-[40px]">
            <StockPieChart />
          </div>
        </DashboardModule>
        <DashboardModule>
          <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
            Portfolio Overview
          </span>
          <div className="flex flex-row justify-between mt-[20px] ml-[40px]">
            <StockPieChart />
          </div>
        </DashboardModule>
      </div>
      <div className="flex flex-row">
        <DashboardModule>
          <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
            Portfolio Overview
          </span>
          <div className="flex flex-row justify-between mt-[20px] ml-[40px]">
            <StockPieChart />
          </div>
        </DashboardModule>
        <DashboardModule>
          <span className="ml-[20px] text-[24px] font-bold mt-[20px] inline-block">
            Portfolio Overview
          </span>
          <div className="flex flex-row justify-between mt-[20px] ml-[40px]">
            <StockPieChart />
          </div>
        </DashboardModule>
      </div>
    </div>
  );
}
