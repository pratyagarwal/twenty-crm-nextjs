import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const BuildingIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke={color} d="M3 21l18 0"></path>
      <path stroke={color} d="M5 21v-14l8 -4v18"></path>
      <path stroke={color} d="M19 21v-10l-6 -4"></path>
      <path stroke={color} d="M9 9l0 .01"></path>
      <path stroke={color} d="M9 12l0 .01"></path>
      <path stroke={color} d="M9 15l0 .01"></path>
      <path stroke={color} d="M9 18l0 .01"></path>
    </svg>
  );
};
