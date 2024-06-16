"use client";
import { FC } from "react";
import { CollapseRightIcon } from "~lib/assets";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { DrawerId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";

export const Page: FC = () => {
  const { theme } = themeStore();
  const { getOrCreateDrawerState, updateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.PRIMARY_SIDENAV);

  return (
    <div
      className={cn(
        "tr h-full transition-all duration-200",
        open
          ? "ml-[236px] w-[calc(100%-236px)]"
          : "ml-3 box-border w-[calc(100%-12px)]",
      )}>
      <div className={"h-[60px] pt-5"}>
        {!open ? (
          <button
            className={
              "flex items-center justify-center rounded p-1 outline-none transition-all duration-200 ease-in hover:bg-bgHover100"
            }
            onClick={() => {
              updateDrawerState(DrawerId.PRIMARY_SIDENAV, { open: true });
            }}>
            <CollapseRightIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#666666"
                  : "#B3B3B3"
              }
            />
          </button>
        ) : null}
      </div>
      <div
        className={
          "mr-3 h-[calc(100%-72px)] rounded-md border border-solid border-border100 bg-bodyPrimary pl-2"
        }>
        Tasks
      </div>
    </div>
  );
};
