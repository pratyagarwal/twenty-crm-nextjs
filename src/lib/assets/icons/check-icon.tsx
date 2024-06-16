import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const CheckIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke={color} d="M5 12l5 5l10 -10"></path>
    </svg>
  );
};
