import React, { FC } from "react";
import MenuIcon from "./Icons/MenuIcon";

interface SideNavBarProps {
  showNav: boolean;
  setShowNav: (a: boolean) => void;
  className: string;
}

const SideNavBar: FC<SideNavBarProps> = ({
  showNav,
  setShowNav,
  className,
}) => {
  return (
    <div className={className}>
      <div className="w-full h-[100px] bg-green-500 text-[40px] flex flex-row justify-between items-center">
        <div></div>
        <span className="text-white ml-[30px]">Menu</span>
        <button className="mr-[20px]" onClick={() => setShowNav(!showNav)}>
          <MenuIcon color="white" />
        </button>
      </div>
    </div>
  );
};

export default SideNavBar;
