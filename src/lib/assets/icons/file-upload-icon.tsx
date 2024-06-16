import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const FileUploadIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
        d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
      <path stroke={color} d="M12 11v6"></path>
      <path stroke={color} d="M9.5 13.5l2.5 -2.5l2.5 2.5"></path>
      <path stroke={color} d="M14 3v4a1 1 0 0 0 1 1h4"></path>
    </svg>
  );
};
