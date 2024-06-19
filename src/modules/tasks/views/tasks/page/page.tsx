"use client";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import {
  ArchiveIcon,
  CalendarIcon,
  CheckIcon,
  CheckboxIcon,
  CollapseRightIcon,
  PlusIcon,
} from "~lib/assets";
import { Avatar } from "~lib/components/avatar";
import { Checkbox } from "~lib/components/checkbox";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { Tabs } from "~modules/common/components";
import { DrawerId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";
import { prospectsStore } from "~modules/prospects/store";
import { taskStore } from "~modules/tasks/store";

export const Page: FC = () => {
  const { theme } = themeStore();
  const { prospects } = prospectsStore();
  const { tasks, updateTask, setState: setTasksState } = taskStore();
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

  const upcomingTasks = useMemo(() => {
    if (tasks.length > 0) {
      const now = dayjs();
      return tasks.filter((task) => {
        if (task.dueDateTime === "Invalid Date") {
          return false;
        }
        const targetDate = dayjs(task.dueDateTime);
        return targetDate.isAfter(now, "day") && !task.isCompleted;
      });
    }
    return [];
  }, [tasks]);

  const todayTasks = useMemo(() => {
    if (tasks.length > 0) {
      const now = dayjs();
      return tasks.filter((task) => {
        if (task.dueDateTime === "Invalid Date") {
          return false;
        }
        const targetDate = dayjs(task.dueDateTime);
        return (
          (targetDate.isSame(now, "day") || targetDate.isBefore(now, "day")) &&
          !task.isCompleted
        );
      });
    }
    return [];
  }, [tasks]);

  const unscheduledTasks = useMemo(() => {
    if (tasks.length > 0) {
      return tasks.filter((task) => {
        return (
          (task.dueDateTime === "Invalid Date" || task.dueDateTime === null) &&
          !task.isCompleted
        );
      });
    }
    return [];
  }, [tasks]);

  const completedTasks = useMemo(() => {
    if (tasks.length > 0) {
      return tasks.filter((task) => task.isCompleted);
    }
    return [];
  }, [tasks]);

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
          onClick={() => {
            setTasksState({ activeTaskId: null });
            updateDrawerState(DrawerId.CREATE_TASK, { open: true });
          }}
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
        {selectedTabId === 1 ? (
          <div className={"ml-6 mt-[40px]"}>
            {todayTasks.length > 0 ? (
              <div className={"w-full"}>
                <div className={"mb-[32px] flex gap-2"}>
                  <h3 className={"text-[15px] font-bold text-text200"}>Today Tasks</h3>
                  <p className={"font-bold text-text300"}>{todayTasks.length}</p>
                </div>
                <div
                  className={
                    "h-fit w-[calc(100%-48px)] overflow-hidden rounded border border-solid border-border200 bg-bodySecondary"
                  }>
                  {todayTasks.map((ele, index) => {
                    const eleProspect = prospects.find(
                      (prospect) => prospect.id === ele.prospectId,
                    );
                    const eleProspectName = eleProspect?.fields.find(
                      (ele) => ele.name === "name",
                    )?.value;
                    return (
                      <div
                        onClick={() => {
                          setTasksState({ activeTaskId: ele.id });
                          updateDrawerState(DrawerId.CREATE_TASK, { open: true });
                        }}
                        key={ele.name}
                        className={cn(
                          "flex h-[49px] w-full items-center justify-between px-4",
                          index !== unscheduledTasks.length - 1
                            ? "border-b border-solid border-border200"
                            : "",
                        )}>
                        <div className={"flex items-center gap-2"}>
                          <Checkbox
                            onClick={(e) => e.stopPropagation()}
                            checked={ele.isCompleted}
                            setChecked={(_check) => {
                              updateTask(ele.id, { isCompleted: _check });
                            }}
                            classNames={{
                              root: cn(
                                "h-[16px] w-[16px] rounded-[100%] border-text200",
                                ele.isCompleted ? "border-none" : "",
                              ),
                            }}
                          />
                          <p
                            className={cn(
                              "text-[13px]",
                              ele.name ? "text-text200" : "text-text100",
                            )}>
                            {ele.name}
                          </p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                          {eleProspectName ? (
                            <div
                              className={
                                "flex h-[20px] items-center gap-1 rounded bg-bgHover100 p-1 opacity-80 hover:opacity-100"
                              }>
                              <Avatar
                                src={null}
                                alt={eleProspectName}
                                fallbackName={eleProspectName}
                                classNames={{
                                  root: "w-[16px] h-[16px] text-[7px] rounded-[50%]",
                                  fallback:
                                    "w-[16px] h-[16px] text-[7px] rounded-[50%]",
                                }}
                              />
                              <p
                                className={
                                  "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all text-[13px] text-text200"
                                }>
                                {eleProspectName}
                              </p>
                            </div>
                          ) : null}
                          <div className={"flex gap-2"}>
                            <CalendarIcon
                              size={"16"}
                              color={
                                ele.dueDateTime &&
                                ele.dueDateTime !== "Invalid Date" &&
                                dayjs(ele.dueDateTime).isBefore(dayjs())
                                  ? "#F93E3D"
                                  : [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(
                                        theme,
                                      )
                                    ? "#333333"
                                    : "#B3B3B3"
                              }
                            />
                            {ele.dueDateTime !== "Invalid Date" ? (
                              <p
                                className={cn(
                                  "text-[13px] text-text200",
                                  ele.dueDateTime &&
                                    ele.dueDateTime !== "Invalid Date" &&
                                    dayjs(ele.dueDateTime).isBefore(dayjs())
                                    ? "text-[#F93E3D]"
                                    : "",
                                )}>
                                {dayjs(ele.dueDateTime).format(
                                  "DD MMM YYYY - HH:mm",
                                ) !== "Invalid Date"
                                  ? dayjs(ele.dueDateTime).format("DD MMM YYYY - HH:mm")
                                  : "-"}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {upcomingTasks.length > 0 ? (
              <div className={"mt-[40px] w-full"}>
                <div className={"mb-[32px] flex gap-2"}>
                  <h3 className={"text-[15px] font-bold text-text200"}>
                    Upcoming Tasks
                  </h3>
                  <p className={"font-bold text-text300"}>{upcomingTasks.length}</p>
                </div>
                <div
                  className={
                    "h-fit w-[calc(100%-48px)] overflow-hidden rounded border border-solid border-border200 bg-bodySecondary"
                  }>
                  {upcomingTasks.map((ele, index) => {
                    const eleProspect = prospects.find(
                      (prospect) => prospect.id === ele.prospectId,
                    );
                    const eleProspectName = eleProspect?.fields.find(
                      (ele) => ele.name === "name",
                    )?.value;
                    return (
                      <div
                        onClick={() => {
                          setTasksState({ activeTaskId: ele.id });
                          updateDrawerState(DrawerId.CREATE_TASK, { open: true });
                        }}
                        key={ele.name}
                        className={cn(
                          "flex h-[49px] w-full items-center justify-between px-4",
                          index !== unscheduledTasks.length - 1
                            ? "border-b border-solid border-border200"
                            : "",
                        )}>
                        <div className={"flex items-center gap-2"}>
                          <Checkbox
                            onClick={(e) => e.stopPropagation()}
                            checked={ele.isCompleted}
                            setChecked={(_check) => {
                              updateTask(ele.id, { isCompleted: _check });
                            }}
                            classNames={{
                              root: cn(
                                "h-[16px] w-[16px] rounded-[100%] border-text200",
                                ele.isCompleted ? "border-none" : "",
                              ),
                            }}
                          />
                          <p
                            className={cn(
                              "text-[13px]",
                              ele.name ? "text-text200" : "text-text100",
                            )}>
                            {ele.name}
                          </p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                          {eleProspectName ? (
                            <div
                              className={
                                "flex h-[20px] items-center gap-1 rounded bg-bgHover100 p-1 opacity-80 hover:opacity-100"
                              }>
                              <Avatar
                                src={null}
                                alt={eleProspectName}
                                fallbackName={eleProspectName}
                                classNames={{
                                  root: "w-[16px] h-[16px] text-[7px] rounded-[50%]",
                                  fallback:
                                    "w-[16px] h-[16px] text-[7px] rounded-[50%]",
                                }}
                              />
                              <p
                                className={
                                  "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all text-[13px] text-text200"
                                }>
                                {eleProspectName}
                              </p>
                            </div>
                          ) : null}
                          <div className={"flex gap-2"}>
                            <CalendarIcon
                              size={"16"}
                              color={
                                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                                  ? "#333333"
                                  : "#B3B3B3"
                              }
                            />
                            {ele.dueDateTime !== "Invalid Date" ? (
                              <p className={"text-[13px] text-text200"}>
                                {dayjs(ele.dueDateTime).format(
                                  "DD MMM YYYY - HH:mm",
                                ) !== "Invalid Date"
                                  ? dayjs(ele.dueDateTime).format("DD MMM YYYY - HH:mm")
                                  : "-"}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {unscheduledTasks.length > 0 ? (
              <div className={"mt-[40px] w-full"}>
                <div className={"mb-[32px] flex gap-2"}>
                  <h3 className={"text-[15px] font-bold text-text200"}>
                    Unscheduled Tasks
                  </h3>
                  <p className={"font-bold text-text300"}>{unscheduledTasks.length}</p>
                </div>
                <div
                  className={
                    "h-fit w-[calc(100%-48px)] overflow-hidden rounded border border-solid border-border200 bg-bodySecondary"
                  }>
                  {unscheduledTasks.map((ele, index) => {
                    const eleProspect = prospects.find(
                      (prospect) => prospect.id === ele.prospectId,
                    );
                    const eleProspectName = eleProspect?.fields.find(
                      (ele) => ele.name === "name",
                    )?.value;
                    return (
                      <div
                        onClick={() => {
                          setTasksState({ activeTaskId: ele.id });
                          updateDrawerState(DrawerId.CREATE_TASK, { open: true });
                        }}
                        key={ele.name}
                        className={cn(
                          "flex h-[49px] w-full items-center justify-between px-4",
                          index !== unscheduledTasks.length - 1
                            ? "border-b border-solid border-border200"
                            : "",
                        )}>
                        <div className={"flex items-center gap-2"}>
                          <Checkbox
                            onClick={(e) => e.stopPropagation()}
                            checked={ele.isCompleted}
                            setChecked={(_check) => {
                              updateTask(ele.id, { isCompleted: _check });
                            }}
                            classNames={{
                              root: cn(
                                "h-[16px] w-[16px] rounded-[100%] border-text200",
                                ele.isCompleted ? "border-none" : "",
                              ),
                            }}
                          />
                          <p
                            className={cn(
                              "text-[13px]",
                              ele.name ? "text-text200" : "text-text100",
                            )}>
                            {ele.name}
                          </p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                          {eleProspectName ? (
                            <div
                              className={
                                "flex h-[20px] items-center gap-1 rounded bg-bgHover100 p-1 opacity-80 hover:opacity-100"
                              }>
                              <Avatar
                                src={null}
                                alt={eleProspectName}
                                fallbackName={eleProspectName}
                                classNames={{
                                  root: "w-[16px] h-[16px] text-[7px] rounded-[50%]",
                                  fallback:
                                    "w-[16px] h-[16px] text-[7px] rounded-[50%]",
                                }}
                              />
                              <p
                                className={
                                  "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all text-[13px] text-text200"
                                }>
                                {eleProspectName}
                              </p>
                            </div>
                          ) : null}
                          <CalendarIcon
                            size={"16"}
                            color={
                              [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                                ? "#333333"
                                : "#B3B3B3"
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {completedTasks.length > 0 ? (
              <div className={"ml-6 mt-[40px] w-full"}>
                <div
                  className={
                    "h-fit w-[calc(100%-48px)] overflow-hidden rounded border border-solid border-border200 bg-bodySecondary"
                  }>
                  {completedTasks.map((ele, index) => {
                    const eleProspect = prospects.find(
                      (prospect) => prospect.id === ele.prospectId,
                    );
                    const eleProspectName = eleProspect?.fields.find(
                      (ele) => ele.name === "name",
                    )?.value;
                    return (
                      <div
                        onClick={() => {
                          setTasksState({ activeTaskId: ele.id });
                          updateDrawerState(DrawerId.CREATE_TASK, { open: true });
                        }}
                        key={ele.name}
                        className={cn(
                          "flex h-[49px] w-full items-center justify-between px-4",
                          index !== unscheduledTasks.length - 1
                            ? "border-b border-solid border-border200"
                            : "",
                        )}>
                        <div className={"flex items-center gap-2"}>
                          <Checkbox
                            onClick={(e) => e.stopPropagation()}
                            checked={ele.isCompleted}
                            setChecked={(_check) => {
                              updateTask(ele.id, { isCompleted: _check });
                            }}
                            classNames={{
                              root: cn(
                                "h-[16px] w-[16px] rounded-[100%] border-text200",
                                ele.isCompleted ? "border-none" : "",
                              ),
                            }}
                          />
                          <p
                            className={cn(
                              "text-[13px] line-through",
                              ele.name ? "text-text200" : "text-text100",
                            )}>
                            {ele.name ? ele.name : "Task Title"}
                          </p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                          {eleProspectName ? (
                            <div
                              className={
                                "flex h-[20px] items-center gap-1 rounded bg-bgHover100 p-1 opacity-80 hover:opacity-100"
                              }>
                              <Avatar
                                src={null}
                                alt={eleProspectName}
                                fallbackName={eleProspectName}
                                classNames={{
                                  root: "w-[16px] h-[16px] text-[7px] rounded-[50%]",
                                  fallback:
                                    "w-[16px] h-[16px] text-[7px] rounded-[50%]",
                                }}
                              />
                              <p
                                className={
                                  "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all text-[13px] text-text200"
                                }>
                                {eleProspectName}
                              </p>
                            </div>
                          ) : null}
                          <div className={"flex gap-2"}>
                            <CalendarIcon
                              size={"16"}
                              color={
                                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                                  ? "#333333"
                                  : "#B3B3B3"
                              }
                            />
                            {ele.dueDateTime !== "Invalid Date" ? (
                              <p className={"text-[13px] text-text200"}>
                                {dayjs(ele.dueDateTime).format(
                                  "DD MMM YYYY - HH:mm",
                                ) !== "Invalid Date"
                                  ? dayjs(ele.dueDateTime).format("DD MMM YYYY - HH:mm")
                                  : "-"}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
