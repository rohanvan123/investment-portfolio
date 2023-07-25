import React, { FC } from "react";

interface MenuIconProps {
  color: string;
}
const MenuIcon: FC<MenuIconProps> = ({ color }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H23M1 9H23M1 17H23"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
