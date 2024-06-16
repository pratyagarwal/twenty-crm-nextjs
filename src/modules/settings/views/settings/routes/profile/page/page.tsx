"use client";
import { FC } from "react";

export const Page: FC = () => {
  return (
    <div
      className={
        "ml-[40vw] flex h-full w-[60vw] justify-start transition-all duration-200"
      }>
      <div
        className={
          "my-3 mr-3 h-[calc(100%-24px)] w-full rounded-md border border-solid border-[#292929] bg-bodyPrimary pl-2"
        }>
        Profile
      </div>
    </div>
  );
};
