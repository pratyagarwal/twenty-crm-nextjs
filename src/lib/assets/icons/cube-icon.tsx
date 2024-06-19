import { FC } from "react";
import { IIconProps } from "~lib/assets/types";

export const CubeIcon: FC<IIconProps> = ({ size = "16", color = "#00000" }) => {
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
      <path
        stroke={color}
        d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z"></path>
      <path stroke={color} d="M12 22v-10"></path>
      <path stroke={color} d="M12 12l8.73 -5.04"></path>
      <path stroke={color} d="M3.27 6.96l8.73 5.04"></path>
    </svg>
  );
};
