import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const CollapseRightIcon: FC<IIconProps> = ({
  size = "16",
  color = "#00000",
}) => {
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
      <path stroke={color} d="M15 4v16"></path>
      <path stroke={color} d="M9 10l2 2l-2 2"></path>
    </svg>
  );
};
