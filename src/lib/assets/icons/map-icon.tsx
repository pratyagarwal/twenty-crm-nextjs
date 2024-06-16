import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const MapIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
      strokeLinejoin="round"
      className="tabler-icon tabler-icon-map">
      <path stroke={color} d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13"></path>
      <path stroke={color} d="M9 4v13"></path>
      <path stroke={color} d="M15 7v13"></path>
    </svg>
  );
};
