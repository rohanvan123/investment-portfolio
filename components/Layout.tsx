import React, { FC, PropsWithChildren, useState } from "react";
import MenuIcon from "./Icons/MenuIcon";
import SideNavBar from "./SideNavBar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="font-[jaldi] h-screen">
      <main
        className={`flex-grow h-full ${
          showNav ? "opacity-40 bg-gray-600" : ""
        }`}
      >
        <button
          className="mt-[25px] ml-[25px]"
          onClick={() => setShowNav(!showNav)}
        >
          <MenuIcon color="black" />
        </button>
        <div className="text-[30px] mb-[20px] ml-[70px] font-bold">
          Welcome, Rohan
        </div>
        {children}
      </main>
      <SideNavBar
        showNav={showNav}
        setShowNav={setShowNav}
        className={`h-screen bg-white z-50 absolute top-0 left-0 w-0 transition-all ${
          showNav ? "w-[300px] duration-500" : "hidden"
        }`}
      />
    </div>
  );
};

export default Layout;
