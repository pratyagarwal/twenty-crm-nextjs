"use client";

import { FC, useMemo, useState } from "react";
import { CheckIcon } from "~lib/assets";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";

export const ThemeCard: FC<{ theme: AppTheme }> = ({ theme }) => {
  const [hovered, setHovered] = useState(true);
  const { theme: appTheme, setState: setAppTheme } = themeStore();

  const backgroundColorClass = useMemo(() => {
    switch (theme) {
      case AppTheme.LIGHT:
        return "bg-[#F1F1F1]";
      case AppTheme.DARK:
        return "bg-[#1C1C1C]";
      case AppTheme.PURPLE_LIGHT:
        return "bg-[#F4F1FF]";
      case AppTheme.PURPLE_DARK:
        return "bg-[#262636]";
    }
  }, [theme]);

  const foregroundColorClass = useMemo(() => {
    switch (theme) {
      case AppTheme.LIGHT:
        return "bg-[#FFFFFF]";
      case AppTheme.DARK:
        return "bg-[#1D1D1D]";
      case AppTheme.PURPLE_LIGHT:
        return "bg-[#FFFFFF]";
      case AppTheme.PURPLE_DARK:
        return "bg-[#1C1C2C]";
    }
  }, [theme]);

  const foregroundBorderColorClass = useMemo(() => {
    switch (theme) {
      case AppTheme.LIGHT:
        return "border border-solid border-[#EBEBEB]";
      case AppTheme.DARK:
        return "border border-solid border-[#333333]";
      case AppTheme.PURPLE_LIGHT:
        return "border border-solid border-[#EBEBEB]";
      case AppTheme.PURPLE_DARK:
        return "border border-solid border-[#333333]";
    }
  }, [theme]);

  const backgroundBorderColorClass = useMemo(() => {
    switch (theme) {
      case AppTheme.LIGHT:
        return "border border-solid border-[#EBEBEB]";
      case AppTheme.DARK:
        return "border border-solid border-[#222222]";
      case AppTheme.PURPLE_LIGHT:
        return "border border-solid border-[#EBEBEB]";
      case AppTheme.PURPLE_DARK:
        return "border border-solid border-[#222222]";
    }
  }, [theme]);

  const textColorClass = useMemo(() => {
    switch (theme) {
      case AppTheme.LIGHT:
        return "text-[#333333]";
      case AppTheme.DARK:
        return "text-[#CCCCCC]";
      case AppTheme.PURPLE_LIGHT:
        return "text-[#333333]";
      case AppTheme.PURPLE_DARK:
        return "text-[#CCCCCC]";
    }
  }, [theme]);

  const label = useMemo(() => {
    switch (theme) {
      case AppTheme.LIGHT:
        return "Light";
      case AppTheme.DARK:
        return "Dark";
      case AppTheme.PURPLE_LIGHT:
        return "Purple-Light";
      case AppTheme.PURPLE_DARK:
        return "Purple-Dark";
    }
  }, [theme]);

  return (
    <div
      onClick={() => {
        setAppTheme({ theme: theme });
      }}
      className={"flex flex-col gap-2"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div
        className={cn(
          "relative h-[80px] w-[120px] cursor-pointer overflow-hidden rounded-md pl-6 pt-6",
          backgroundColorClass,
          backgroundBorderColorClass,
        )}>
        <div
          className={cn(
            "h-[80px] w-[120px] rounded-md p-2 transition-all duration-200 ease-in",
            foregroundColorClass,
            foregroundBorderColorClass,
            hovered ? "scale-110" : "",
          )}>
          <p className={cn(textColorClass)}>Aa</p>
        </div>
        {appTheme === theme ? (
          <div className={"absolute bottom-0 right-0 p-2"}>
            <div
              className={
                "flex h-5 w-5 flex-row items-center justify-center rounded-[50%] bg-[#1961ED]"
              }>
              <CheckIcon size={"14"} color={"#FFFFFF"} />
            </div>
          </div>
        ) : null}
      </div>
      <p className={"text-[11px] font-medium text-text100"}>{label}</p>
    </div>
  );
};
