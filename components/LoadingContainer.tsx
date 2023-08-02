import { useTickerList } from "@/hooks/user";
import Link from "next/link";
import ReactLoading from "react-loading";

const LoadingContainter = () => {
  const { tickerList } = useTickerList();
  return tickerList.length !== 0 ? (
    <div className="flex flex-col items-center mt-[50px]">
      <ReactLoading type={"spin"} color="green" />
    </div>
  ) : (
    <div className="flex flex-col items-center mt-[50px]">
      <span className="text-[20px]">You have no stocks in your portfolio</span>
      <Link
        href="/investments"
        className="mt-[20px] bg-green-500 text-white w-[120px] h-[50px] rounded-xl flex flex-row justify-center items-center"
      >
        <span className="text-[20px]">Add</span>
      </Link>
    </div>
  );
};

export default LoadingContainter;
