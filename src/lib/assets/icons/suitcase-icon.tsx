import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const SuitcaseIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
        d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
      <path stroke={color} d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
      <path stroke={color} d="M12 12l0 .01"></path>
      <path stroke={color} d="M3 13a20 20 0 0 0 18 0"></path>
    </svg>
  );
};
