import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const PlusIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
      className="tabler-icon tabler-icon-plus">
      <path stroke={color} d="M12 5l0 14"></path>
      <path stroke={color} d="M5 12l14 0"></path>
    </svg>
  );
};
