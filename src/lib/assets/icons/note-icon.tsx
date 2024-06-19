import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const NoteIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
        d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
      <path stroke={color} d="M9 7l6 0"></path>
      <path stroke={color} d="M9 11l6 0"></path>
      <path stroke={color} d="M9 15l4 0"></path>
    </svg>
  );
};
