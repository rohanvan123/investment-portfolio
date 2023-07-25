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
        <div className="text-[50px] mt-[20px] ml-[90px] font-bold">
          Welcome, Rohan
        </div>
        {children}
      </main>
      {showNav && <SideNavBar showNav={showNav} setShowNav={setShowNav} />}
    </div>
  );
};

export default Layout;
