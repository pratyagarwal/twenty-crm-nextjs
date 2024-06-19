"use client";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import {
  CalendarIcon,
  CheckIcon,
  CollapseRightIcon,
  EmailIcon,
  NoteIcon,
  PlusIcon,
  UserIcon,
} from "~lib/assets";
import { Avatar } from "~lib/components/avatar";
import { Checkbox } from "~lib/components/checkbox";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { getTimeFromNow } from "~lib/utils/datetime";
import { CompanyCell, ManageCell, Tabs } from "~modules/common/components";
import { Companies, DrawerId, FieldType } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";
import { prospectsStore } from "~modules/prospects/store";
import { getFilterIconByName } from "~modules/prospects/utils";
import { taskStore } from "~modules/tasks/store";

export interface IPageProps {
  id: string;
}

export const Page: FC<IPageProps> = ({ id }) => {
  const { theme } = themeStore();

  const { tasks, setState: setTasksState, updateTask } = taskStore();
  const { prospects, updateProspectField } = prospectsStore();
  const { getOrCreateDrawerState, updateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.PRIMARY_SIDENAV);
  const [selectedTabId, setSelectedTabId] = useState(1);

  const curProspect = useMemo(() => {
    return prospects.find((ele) => ele.id === id);
  }, [id, prospects]);

  const prospectData = useMemo(() => {
    const data = [
      {
        name: "city",
        icon: getFilterIconByName("city"),
        type: FieldType.STRING,
        value: curProspect?.fields.find((ele) => ele.name === "city")?.value ?? "",
      },
      {
        name: "createdAt",
        icon: getFilterIconByName("createdAt"),
        type: FieldType.DATETIME,
        value: curProspect?.fields.find((ele) => ele.name === "createdAt")?.value ?? "",
      },
      {
        name: "email",
        icon: getFilterIconByName("email"),
        type: FieldType.EMAIL,
        value: curProspect?.fields.find((ele) => ele.name === "email")?.value ?? "",
      },
      {
        name: "jobTitle",
        icon: getFilterIconByName("jobTitle"),
        type: FieldType.STRING,
        value: curProspect?.fields.find((ele) => ele.name === "jpbTitle")?.value ?? "",
      },
      {
        name: "linkedin",
        icon: getFilterIconByName("linkedin"),
        type: FieldType.URL,
        value: curProspect?.fields.find((ele) => ele.name === "linkedin")?.value ?? "",
      },
      {
        name: "phone",
        icon: getFilterIconByName("name"),
        type: FieldType.PHONE,
        value: curProspect?.fields.find((ele) => ele.name === "phone")?.value ?? "",
      },
    ];

    return data;
  }, [curProspect]);

  const tabs = useMemo(() => {
    return [
      {
        id: 1,
        icon: CheckIcon,
        label: "Tasks",
        onClickCb: () => setSelectedTabId(1),
      },
      {
        id: 2,
        icon: NoteIcon,
        label: "Notes",
        onClickCb: () => setSelectedTabId(2),
      },
      {
        id: 3,
        icon: EmailIcon,
        label: "Emails",
        onClickCb: () => setSelectedTabId(3),
      },
    ];
  }, [setSelectedTabId]);

  const curPospectCompany = useMemo(() => {
    return Companies.find(
      (ele) =>
        ele.name === curProspect?.fields.find((ele) => ele.name === "company")?.value,
    );
  }, [curProspect]);

  const getVerboseName = (name: string) => {
    switch (name) {
      case "name":
        return "Name";
      case "company":
        return "Company";
      case "email":
        return "Email";
      case "phone":
        return "Phone";
      case "createdAt":
        return "Creation Date";
      case "city":
        return "City";
      case "jobTitle":
        return "Job Title";
      case "linkedin":
        return "Linkedin";
      default:
        return `${name[0].toUpperCase()}${name.slice(1)}`;
    }
  };

  const upcomingTasks = useMemo(() => {
    if (tasks.length > 0) {
      const now = dayjs();
      return tasks.filter((task) => {
        if (task.dueDateTime === "Invalid Date") {
          return false;
        }
        const targetDate = dayjs(task.dueDateTime);
        return (
          targetDate.isAfter(now, "day") && !task.isCompleted && task.prospectId === id
        );
      });
    }
    return [];
  }, [tasks, id]);

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
          !task.isCompleted &&
          task.prospectId === id
        );
      });
    }
    return [];
  }, [tasks, id]);

  const unscheduledTasks = useMemo(() => {
    if (tasks.length > 0) {
      return tasks.filter((task) => {
        return (
          (task.dueDateTime === "Invalid Date" || task.dueDateTime === null) &&
          !task.isCompleted &&
          task.prospectId === id
        );
      });
    }
    return [];
  }, [tasks, id]);

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
            <UserIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#333333"
                  : "#EBEBEB"
              }
            />
            <p className={cn("text-[13px] font-medium text-text200")}>
              {curProspect?.fields.find((ele) => ele.name === "name")?.value ?? ""}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            updateDrawerState(DrawerId.CREATE_TASK, { open: true });
          }}
          className={
            "flex h-[34px] items-center justify-center gap-2 rounded-md border border-solid border-border100 hover:bg-bgHover100"
          }>
          <PlusIcon
            color={
              [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                ? "#666666"
                : "#B3B3B3"
            }
          />
          <p className={"text-[13px] text-text100"}> Add Task</p>
        </button>
      </div>
      <div
        className={
          "mr-3 flex h-[calc(100%-72px)] rounded-md border border-solid border-border100 bg-bodyPrimary"
        }>
        <div
          className={
            "flex h-full w-[348px] flex-col border-r border-solid border-border200"
          }>
          <div
            className={
              "flex h-[160px] w-full flex-col items-center border-b border-solid border-border200 p-4"
            }>
            <Avatar
              src={null}
              alt={curProspect?.fields.find((ele) => ele.name === "name")?.value ?? ""}
              fallbackName={
                curProspect?.fields.find((ele) => ele.name === "name")?.value ?? ""
              }
              classNames={{
                root: "w-[40px] h-[40px] mt-4",
                fallback: "w-[40px] h-[40px] leading-[14px] text-[20px] rounded-[50%]",
              }}
            />
            <p className={"mt-4 text-[20px] text-text200"}>
              {curProspect?.fields.find((ele) => ele.name === "name")?.value ?? ""}
            </p>
            <p className={"mt-2 text-[13px] text-text300"}>
              Added{" "}
              {getTimeFromNow(
                curProspect?.fields.find((ele) => ele.name === "createdAt")?.value ??
                  null,
              )}
            </p>
          </div>
          <div
            className={
              "flex h-[240px] w-full flex-col gap-1 border-b border-solid border-border200 p-3"
            }>
            {prospectData.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.name} className={"flex flex-row gap-1"}>
                  <div
                    className={
                      "text box-border flex h-[32px] min-w-[150px] items-center gap-2 p-2"
                    }>
                    <Icon
                      size={"16px"}
                      color={
                        [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                          ? "#B3B3B3"
                          : "#666666"
                      }
                    />
                    <p className={"text-[12px] text-text300"}>
                      {getVerboseName(field.name)}
                    </p>
                  </div>
                  <div className={"translate-x-[-20px]"}>
                    <ManageCell
                      fieldType={field.type.toString()}
                      fieldName={field.name}
                      fieldValue={field.value}
                      prospectId={id}
                      updateProspectField={updateProspectField}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={"p-3"}>
            <p className={"mb-2 text-[13px] text-text200"}>Company</p>
            <CompanyCell
              fieldName={"company"}
              fieldValue={curPospectCompany?.name ?? ""}
              prospectId={id}
              updateProspectField={updateProspectField}
              isSelected={false}
            />
          </div>
        </div>
        <div className={"h-full w-[calc(100%-348px)]"}>
          <Tabs selectedTabId={selectedTabId} tabs={tabs} />
          {selectedTabId === 1 ? (
            <div className={"ml-6 mt-[40px]"}>
              {todayTasks.length > 0 ? (
                <div className={"w-full"}>
                  <div className={"mb-[32px] flex gap-2"}>
                    <h3 className={"text-[15px] font-bold text-text200"}>
                      Today Tasks
                    </h3>
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
                                    ? dayjs(ele.dueDateTime).format(
                                        "DD MMM YYYY - HH:mm",
                                      )
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
                                  [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(
                                    theme,
                                  )
                                    ? "#333333"
                                    : "#B3B3B3"
                                }
                              />
                              {ele.dueDateTime !== "Invalid Date" ? (
                                <p className={"text-[13px] text-text200"}>
                                  {dayjs(ele.dueDateTime).format(
                                    "DD MMM YYYY - HH:mm",
                                  ) !== "Invalid Date"
                                    ? dayjs(ele.dueDateTime).format(
                                        "DD MMM YYYY - HH:mm",
                                      )
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
                    <p className={"font-bold text-text300"}>
                      {unscheduledTasks.length}
                    </p>
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
          ) : null}
        </div>
      </div>
    </div>
  );
};
