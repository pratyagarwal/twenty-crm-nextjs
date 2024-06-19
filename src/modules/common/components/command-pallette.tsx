"use client";
import Mousetrap from "mousetrap";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { CheckboxIcon, SettingsIcon, UserIcon } from "~lib/assets";
import { Drawer } from "~lib/components";
import { Avatar } from "~lib/components/avatar";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { DrawerId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";
import { prospectsStore } from "~modules/prospects/store";

export const CommandPallette: FC = () => {
  const { theme } = themeStore();
  const router = useRouter();
  const { prospects } = prospectsStore();
  const [search, setSearch] = useState("");
  const { getOrCreateDrawerState, updateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.COMMAND_PALLETE);
  const [activeIndex, setActiveIndex] = useState(-1);

  const allActionItems = useMemo(() => {
    return [
      {
        actionHeader: "Create",
        actionName: "Create Task",
        actionShortCut: "",
        icon: (
          <div
            className={
              "flex h-[24px] w-[24px] items-center justify-center rounded bg-bgHover100"
            }>
            <CheckboxIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#333333"
                  : "#EBEBEB"
              }
            />
          </div>
        ),
        actionFn: () => {
          updateDrawerState(DrawerId.CREATE_TASK, { open: true });
        },
      },
      {
        actionHeader: "Navigate",
        actionName: "Go To Prospects",
        actionShortCut: "GP",
        icon: (
          <div
            className={
              "flex h-[24px] w-[24px] items-center justify-center rounded bg-bgHover100"
            }>
            <UserIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#333333"
                  : "#EBEBEB"
              }
            />
          </div>
        ),
        actionFn: () => {
          router.push("/prospects");
        },
      },
      {
        actionHeader: "Navigate",
        actionName: "Go To Settings",
        actionShortCut: "GS",
        icon: (
          <div
            className={
              "flex h-[24px] w-[24px] items-center justify-center rounded bg-bgHover100"
            }>
            <SettingsIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#333333"
                  : "#EBEBEB"
              }
            />
          </div>
        ),
        actionFn: () => {
          router.push("/settings");
        },
      },
      {
        actionHeader: "Navigate",
        actionName: "Go To Tasks",
        actionShortCut: "GT",
        icon: (
          <div
            className={
              "flex h-[24px] w-[24px] items-center justify-center rounded bg-bgHover100"
            }>
            <SettingsIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#333333"
                  : "#EBEBEB"
              }
            />
          </div>
        ),
        actionFn: () => {
          router.push("/tasks");
        },
      },
      ...[...prospects].map((prospect) => {
        return {
          actionHeader: "Prospects",
          actionName: prospect.fields.find((ele) => ele.name === "name")?.value ?? "",
          actionShortCut: "",
          icon: (
            <div
              className={
                "flex h-[24px] w-[24px] items-center justify-center rounded bg-bgHover100"
              }>
              <Avatar
                src={null}
                alt={
                  prospect.fields
                    .find((ele) => ele.name === "name")
                    ?.value.split(" ")[0] ?? ""
                }
                fallbackName={
                  prospect.fields
                    .find((ele) => ele.name === "name")
                    ?.value.split(" ")[0] ?? ""
                }
                classNames={{
                  root: "w-[16px] h-[16px] rounded-[50%]",
                  fallback: "w-[16px] h-[16px] text-[12px] rounded-[50%]",
                }}
              />
            </div>
          ),
          actionFn: () => {
            router.push(`/prospects/${prospect.id}`);
          },
        };
      }),
    ];
  }, [prospects, router, theme, updateDrawerState]);

  const [actionItems, setActionItems] = useState(allActionItems);

  useEffect(() => {
    Mousetrap.bind(["command+k", "ctrl+k"], () => {
      updateDrawerState(DrawerId.COMMAND_PALLETE, { open: true });
      return false;
    });

    Mousetrap.bind("g p", function () {
      router.push("/prospects");
    });

    Mousetrap.bind("g s", function () {
      router.push("/settings");
    });

    Mousetrap.bind("g t", function () {
      router.push("/tasks");
    });

    Mousetrap.bind("down", function () {
      setActiveIndex((prev) => {
        if (prev === actionItems.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    });

    Mousetrap.bind("up", function () {
      setActiveIndex((prev) => {
        if (prev === -1 || prev === 0) {
          return prev;
        }
        return prev - 1;
      });
    });

    Mousetrap.bind(["enter", "return"], function () {
      if (activeIndex !== -1) {
        actionItems[activeIndex].actionFn();
      }
    });
  }, [router, updateDrawerState, actionItems, activeIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActionItems([
        ...allActionItems
          .slice(0, 3)
          .filter(
            (ele) =>
              ele.actionName.toLowerCase().includes(search.toLowerCase()) ||
              ele.actionShortCut.toLowerCase().includes(search.toLowerCase()),
          ),
        ...[...prospects]
          .filter((ele) =>
            ele.fields
              .find((ele) => ele.name === "name")
              ?.value.toLowerCase()
              .includes(search.toLowerCase()),
          )
          .map((prospect) => {
            return {
              actionHeader: "Prospects",
              actionName:
                prospect.fields.find((ele) => ele.name === "name")?.value ?? "",
              actionShortCut: "",
              icon: (
                <div
                  className={
                    "flex h-[24px] w-[24px] items-center justify-center rounded bg-bgHover100"
                  }>
                  <Avatar
                    src={null}
                    alt={
                      prospect.fields
                        .find((ele) => ele.name === "name")
                        ?.value.split(" ")[0] ?? ""
                    }
                    fallbackName={
                      prospect.fields
                        .find((ele) => ele.name === "name")
                        ?.value.split(" ")[0] ?? ""
                    }
                    classNames={{
                      root: "w-[16px] h-[16px] rounded-[50%]",
                      fallback: "w-[16px] h-[16px] text-[12px] rounded-[50%]",
                    }}
                  />
                </div>
              ),
              actionFn: () => {
                router.push(`/prospects/${prospect.id}`);
              },
            };
          }),
      ]);
    }, 200);

    return () => clearTimeout(timer);
  }, [allActionItems, prospects, router, search]);

  return (
    <Drawer
      orientation={"rtl"}
      trigger={<></>}
      open={open}
      onOpenChange={(_open) => {
        updateDrawerState(DrawerId.COMMAND_PALLETE, { open: _open });
      }}>
      <div
        className={
          "h-screen w-[500px] border-l border-solid border-border100 bg-bodySecondary"
        }>
        <div
          className={
            "flex h-[61px] items-center border-b border-solid border-border100"
          }>
          <input
            onFocus={() => setActiveIndex(-1)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search"}
            className={
              "mousetrap flex h-full items-center bg-bodySecondary pl-4 text-[16px] text-text200 outline-none"
            }
          />
          <p className={"absolute right-[10px] top-[4px] text-[11px] text-text400"}>
            Press Esc To Cancel
          </p>
        </div>
        <div className={"flex flex-col gap-2 pl-2"}>
          {actionItems.map((ele, index, allItems) => {
            return (
              <div key={ele.actionName} className={"flex flex-col gap-2"}>
                {index === 0 ||
                allItems[index].actionHeader !== allItems[index - 1].actionHeader ? (
                  <p className={"mt-[20px] pl-2 text-[11px] text-text200"}>
                    {ele.actionHeader.toUpperCase()}
                  </p>
                ) : null}
                <div
                  onClick={ele.actionFn}
                  className={cn(
                    "relative mr-2 flex h-[32px] cursor-pointer items-center gap-2 rounded p-2 pl-1 hover:bg-bgHover100",
                    activeIndex === index ? "bg-bgHover100" : "",
                  )}>
                  {ele.icon}
                  <p className={cn("text-[13px] text-text200")}>{ele.actionName}</p>
                  {ele.actionShortCut ? (
                    <div
                      className={
                        "absolute right-[16px] top-[50%] flex translate-y-[-50%] items-center gap-1"
                      }>
                      <div
                        className={
                          "flex h-[20px] w-[20px] items-center justify-center rounded border border-solid border-border100"
                        }>
                        <p className={"text-[13px] text-text200"}>
                          {ele.actionShortCut[0]}
                        </p>
                      </div>
                      <p className={"text-[13px] text-text300"}>then</p>
                      <div
                        className={
                          "flex h-[20px] w-[20px] items-center justify-center rounded border border-solid border-border100"
                        }>
                        <p className={"text-[13px] text-text200"}>
                          {ele.actionShortCut[1]}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Drawer>
  );
};
