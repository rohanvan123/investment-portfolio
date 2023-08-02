import ReactLoading from "react-loading";

const LoadingContainter = () => {
  return (
    <div className="flex flex-col items-center mt-[50px]">
      <ReactLoading type={"spin"} color="green" />
      <span className="text-[20px] mt-[20px]">Fetching Data</span>
    </div>
  );
};

export default LoadingContainter;
