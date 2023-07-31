import React, { FC } from "react";
import MenuIcon from "./Icons/MenuIcon";
import StockIcon from "./Icons/StockIcon";
import DashboardIcon from "./Icons/DashboardIcon";
import Link from "next/link";
import { useRouter } from "next/router";

interface SideNavBarProps {
  showNav: boolean;
  setShowNav: (a: boolean) => void;
  className: string;
}

const links = [
  {
    icon: <DashboardIcon />,
    link: "/dashboard",
    text: "Dashboard",
  },
  {
    icon: <StockIcon />,
    link: "/investments",
    text: "Investments",
  },
];

const SideNavBar: FC<SideNavBarProps> = ({
  showNav,
  setShowNav,
  className,
}) => {
  const router = useRouter();
  return (
    <div className={className}>
      <div className="w-full h-[100px] bg-green-500 text-[40px] flex flex-row justify-between items-center">
        <div></div>
        <span className="text-white ml-[30px]">Menu</span>
        <button className="mr-[20px]" onClick={() => setShowNav(!showNav)}>
          <MenuIcon color="white" />
        </button>
      </div>
      <div className="flex flex-col">
        {links.map((linkObject, idx: number) => (
          <Link
            key={idx}
            className={`w-full h-[100px] flex flex-col items-center justify-center hover:bg-gray-200 ${
              router.asPath == linkObject.link ? "bg-gray-200" : ""
            }`}
            href={linkObject.link}
          >
            <div className="flex flex-row w-[70%]">
              {linkObject.icon}
              <span className="text-[25px] ml-[20px] hover:ml-[25px]">
                {linkObject.text}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
