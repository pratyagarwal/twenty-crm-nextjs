import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const ArrowLeftIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke={color} d="M15 6l-6 6l6 6"></path>
    </svg>
  );
};
