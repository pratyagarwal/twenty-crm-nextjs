import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const TrashIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="tabler-icon tabler-icon-trash">
      <path stroke={color} d="M4 7l16 0"></path>
      <path stroke={color} d="M10 11l0 6"></path>
      <path stroke={color} d="M14 11l0 6"></path>
      <path stroke={color} d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
      <path stroke={color} d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
    </svg>
  );
};
