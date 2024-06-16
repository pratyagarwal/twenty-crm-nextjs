import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const UserIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
      className="tabler-icon tabler-icon-user">
      <path stroke={color} d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
      <path stroke={color} d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
  );
};
