import React, { FC } from "react";
import MenuIcon from "./Icons/MenuIcon";

interface SideNavBarProps {
  showNav: boolean;
  setShowNav: (a: boolean) => void;
}

const SideNavBar: FC<SideNavBarProps> = ({ showNav, setShowNav }) => {
  return (
    <div
      className={`w-[300px] h-screen bg-white z-50 absolute top-0 left-0 transition-all duration-500 ${
        showNav
          ? "translate-x-0 border-r-[0.5px] border-white"
          : "-translate-x-[100%]"
      }`}
    >
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
