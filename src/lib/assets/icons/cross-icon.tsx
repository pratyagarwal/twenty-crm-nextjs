import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const CrossIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke={color} d="M18 6l-12 12"></path>
      <path stroke={color} d="M6 6l12 12"></path>
    </svg>
  );
};
