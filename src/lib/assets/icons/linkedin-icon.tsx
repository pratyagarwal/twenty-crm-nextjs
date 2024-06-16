import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const LinkedinIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
        d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
      <path stroke={color} d="M8 11l0 5"></path>
      <path stroke={color} d="M8 8l0 .01"></path>
      <path stroke={color} d="M12 16l0 -5"></path>
      <path stroke={color} d="M16 16v-3a2 2 0 0 0 -4 0"></path>
    </svg>
  );
};
