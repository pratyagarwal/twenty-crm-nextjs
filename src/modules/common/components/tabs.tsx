"use client";

import { FC } from "react";
import { IIconProps } from "~lib/assets/types";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";

export interface ITabs {
  selectedTabId: number;
  tabs: { id: number; icon: FC<IIconProps>; label: string; onClickCb: () => void }[];
}

export const Tabs: FC<ITabs> = ({ selectedTabId, tabs }) => {
  const { theme } = themeStore();
  return (
    <div
      className={
        "flex h-[40px] w-full items-center gap-2 border-b border-solid border-border200 p-2"
      }>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <div
            key={tab.id}
            onClick={tab.onClickCb}
            className={cn(
              "relative flex h-[24px] cursor-pointer flex-row gap-2 rounded p-1 hover:bg-bgHover100",
            )}>
            <Icon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? selectedTabId === tab.id
                    ? "#333333"
                    : "#666666"
                  : selectedTabId === tab.id
                    ? "#EBEBEB"
                    : "#B3B3B3"
              }
            />
            <p
              className={cn(
                "text-[13px] font-medium text-text100 hover:text-text200",
                selectedTabId === tab.id ? "text-text200" : "",
              )}>
              {tab.label}
            </p>
            {selectedTabId === tab.id ? (
              <div
                className={
                  "absolute bottom-[-8px] left-[50%] h-[0.5px] w-[65px] translate-x-[-50%] bg-text200"
                }
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
