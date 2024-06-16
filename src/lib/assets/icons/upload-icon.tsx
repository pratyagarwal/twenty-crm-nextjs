import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const UploadIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
      <path stroke={color} d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
      <path stroke={color} d="M7 9l5 -5l5 5"></path>
      <path stroke={color} d="M12 4l0 12"></path>
    </svg>
  );
};
