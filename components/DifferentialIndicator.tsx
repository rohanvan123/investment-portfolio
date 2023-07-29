import { DataEntry } from "@/types/types";
import { FC } from "react";
import TriangleIcon from "./Icons/TriangleIcon";

interface DifferentialIndicatorProps {
  textRange: string;
  prev: DataEntry;
  current: DataEntry;
}

const percentDifference = (prev: DataEntry, current: DataEntry) => {
  return ((current.value - prev.value) / prev.value) * 100;
};

const DifferentialIndicator: FC<DifferentialIndicatorProps> = ({
  textRange,
  prev,
  current,
}) => {
  const percentChange = percentDifference(prev, current);
  const description =
    (percentChange > 0
      ? "+ " + Math.abs(percentChange).toFixed(1)
      : "- " + Math.abs(percentChange).toFixed(1)) + "%";
  return (
    <div className="flex flex-row">
      <div
        className={`mr-[6px] ${
          percentChange > 0 ? "mt-[7px]" : "rotate-180 mb-[7px]"
        }`}
      >
        <TriangleIcon color={percentChange > 0 ? "green" : "red"} />
      </div>
      <span className="text-[18px]">{description + textRange}</span>
    </div>
  );
};

export default DifferentialIndicator;
