import React, { FC, PropsWithChildren } from "react";

interface DashboardModuleProps {
  className?: string;
}

const DashboardModule: FC<PropsWithChildren<DashboardModuleProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-[500px] h-[300px] border-black border-[2px] rounded-[5px] mt-[60px] ml-[50px] ${className}`}
    >
      {children}
    </div>
  );
};

export default DashboardModule;
