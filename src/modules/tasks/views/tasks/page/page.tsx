"use client";
import { FC, useMemo, useState } from "react";
import {
  ArchiveIcon,
  CheckIcon,
  CheckboxIcon,
  CollapseRightIcon,
  PlusIcon,
} from "~lib/assets";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { Tabs } from "~modules/common/components";
import { DrawerId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";

export const Page: FC = () => {
  const { theme } = themeStore();
  const { getOrCreateDrawerState, updateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.PRIMARY_SIDENAV);

  const [selectedTabId, setSelectedTabId] = useState(1);
  const tabs = useMemo(() => {
    return [
      {
        id: 1,
        icon: CheckIcon,
        label: "Todo",
        onClickCb: () => setSelectedTabId(1),
      },
      {
        id: 2,
        icon: ArchiveIcon,
        label: "Done",
        onClickCb: () => setSelectedTabId(2),
      },
    ];
  }, [setSelectedTabId]);

  return (
    <div
      className={cn(
        "tr h-full transition-all duration-200",
        open
          ? "ml-[236px] w-[calc(100%-236px)]"
          : "ml-3 box-border w-[calc(100%-12px)]",
      )}>
      <div className={"flex h-[60px] w-full items-center justify-between pr-3 pt-1"}>
        <div className={"flex items-center gap-4"}>
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
          <div className={cn("flex cursor-pointer flex-row gap-2 rounded p-1")}>
            <CheckboxIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#333333"
                  : "#EBEBEB"
              }
            />
            <p className={cn("text-[13px] font-medium text-text200")}>Tasks</p>
          </div>
        </div>
        <button
          className={
            "flex h-[34px] w-[34px] items-center justify-center rounded-md border border-solid border-border100 hover:bg-bgHover100"
          }>
          <PlusIcon
            color={
              [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                ? "#666666"
                : "#B3B3B3"
            }
          />
        </button>
      </div>
      <div
        className={
          "mr-3 h-[calc(100%-72px)] rounded-md border border-solid border-border100 bg-bodyPrimary"
        }>
        <Tabs selectedTabId={selectedTabId} tabs={tabs} />
      </div>
    </div>
  );
};
