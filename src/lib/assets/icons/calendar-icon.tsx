import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const CalendarIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
      <path
        stroke={color}
        d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
      <path stroke={color} d="M16 3v4"></path>
      <path stroke={color} d="M8 3v4"></path>
      <path stroke={color} d="M4 11h16"></path>
      <path stroke={color} d="M11 15h1"></path>
      <path stroke={color} d="M12 15v3"></path>
    </svg>
  );
};
