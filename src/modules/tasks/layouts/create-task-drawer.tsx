"use client";

import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import React, { FC, useEffect, useMemo, useState } from "react";
import { CalendarIcon, CrossIcon, TrashIcon, UserIcon } from "~lib/assets";
import { Drawer } from "~lib/components";
import { Avatar } from "~lib/components/avatar";
import { Checkbox } from "~lib/components/checkbox";
import { DateTimePicker } from "~lib/components/datetime-picker/datetime-picker";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { ProspectsDropdown } from "~modules/common/components/prospects-dropdown";
import { DrawerId, DropdownId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";
import { dropdownStore } from "~modules/common/stores/dropdown-store";
import { prospectsStore } from "~modules/prospects/store";
import { taskStore } from "~modules/tasks/store";

export const CreateTaskDrawer: FC = () => {
  const { theme } = themeStore();
  const pathname = usePathname();
  const { prospects } = prospectsStore();
  const { getOrCreateDropdownState, updateDropdownState } = dropdownStore();
  const { open: dueDateOpen } = getOrCreateDropdownState(DropdownId.DUE_DATE);
  const {
    tasks,
    activeTaskId,
    updateTask,
    addTask,
    setState: setTasksState,
  } = taskStore();
  const { getOrCreateDrawerState, updateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.CREATE_TASK);

  const activeTask = useMemo(() => {
    return tasks.find((ele) => ele.id === activeTaskId);
  }, [tasks, activeTaskId]);

  const [checked, setChecked] = useState(activeTask?.isCompleted ?? false);
  const [taskName, setTaskName] = useState(activeTask?.name ?? "");
  const [dueDate, setDueDate] = useState(
    activeTask?.dueDateTime ? dayjs(activeTask.dueDateTime).toDate() : null,
  );
  const [notes, setNotes] = useState(activeTask?.notes ?? "");
  const [prospectId, setProspectId] = useState(
    activeTask?.prospectId ?? pathname.includes("/prospects/")
      ? pathname.split("/prospects/")[1]
      : null,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!activeTaskId && taskName && open) {
        const taskId = addTask({ name: taskName });
        setTasksState({ activeTaskId: taskId });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [activeTaskId, addTask, open, setTasksState, taskName]);

  useEffect(() => {
    if (activeTaskId) {
      updateTask(activeTaskId, {
        isCompleted: checked,
        dueDateTime: dayjs(dueDate).format(),
        prospectId: prospectId,
      });
    }
  }, [activeTaskId, addTask, checked, dueDate, prospectId, setTasksState, updateTask]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTaskId) {
        updateTask(activeTaskId, {
          notes: notes,
          name: taskName,
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [activeTaskId, addTask, notes, setTasksState, taskName, updateTask]);

  const curProspect = useMemo(() => {
    return prospects.find((ele) => ele.id === prospectId);
  }, [prospectId, prospects]);

  return (
    <Drawer
      orientation={"rtl"}
      trigger={<></>}
      open={open}
      onOpenChange={(_open) => {
        updateDrawerState(DrawerId.CREATE_TASK, { open: _open });
      }}>
      <div
        className={
          "h-screen w-[500px] border-l border-solid border-border100 bg-bodyPrimary"
        }>
        <div
          className={
            "flex h-[61px] items-center justify-between border-b border-solid border-border100 bg-bodySecondary px-3"
          }>
          <button
            className={
              "flex h-[34px] w-[34px] items-center justify-center rounded-md border border-solid border-border100 hover:bg-bgHover100"
            }>
            <TrashIcon
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#666666"
                  : "#B3B3B3"
              }
            />
          </button>
          <button
            className={
              "flex items-center justify-center rounded p-1 outline-none transition-all duration-200 ease-in hover:bg-bgHover100"
            }
            onClick={() => {
              setTasksState({ activeTaskId: null });
              updateDrawerState(DrawerId.CREATE_TASK, { open: false });
            }}>
            <CrossIcon
              size={"16"}
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
            "flex h-[240px] flex-col justify-between border-b border-solid border-border100 bg-bodySecondary p-6"
          }>
          <div className={"mb-[20px] flex h-[30px] flex-row items-center gap-2"}>
            <Checkbox
              checked={checked}
              setChecked={setChecked}
              classNames={{
                root: cn(
                  "h-[20px] w-[20px] rounded-[100%] border-text200",
                  !activeTaskId ? "pointer-events-none opacity-30 " : "",
                  checked ? "border-none" : "",
                ),
              }}
            />
            <input
              autoFocus={true}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder={"Task Title"}
              className={
                "h-[24px] w-[400px] overflow-scroll bg-bodySecondary text-[18px] text-text200 outline-none placeholder:font-bold placeholder:text-text300"
              }
            />
          </div>
          <div
            className={cn(
              "flex h-[240px] w-full flex-col gap-1 border-b border-solid border-border200",
              !activeTaskId ? "pointer-events-none opacity-10" : "",
            )}>
            <div className={"flex flex-row gap-1"}>
              <div
                className={
                  "text box-border flex h-[32px] min-w-[150px] items-center gap-2"
                }>
                <CalendarIcon
                  size={"16px"}
                  color={
                    [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                      ? "#B3B3B3"
                      : "#666666"
                  }
                />
                <p className={"text-[12px] text-text300"}>Due Date</p>
              </div>
              <DateTimePicker
                datetime={dueDate}
                setDatetime={(_datetime) => setDueDate(_datetime)}
                trigger={
                  <div
                    onClick={() =>
                      updateDropdownState(DropdownId.DUE_DATE, {
                        open: true,
                      })
                    }
                    className={cn(
                      "box-border flex h-[32px] min-w-[200px] items-center p-2",
                    )}>
                    <p
                      className={
                        "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all text-[13px] text-text200"
                      }>
                      {dayjs(dueDate).format("DD MMM YYYY - HH:mm") !== "Invalid Date"
                        ? dayjs(dueDate).format("DD MMM YYYY - HH:mm")
                        : "--/--/--"}
                    </p>
                  </div>
                }
                open={dueDateOpen}
                onOpenChange={(_open) =>
                  updateDropdownState(DropdownId.DUE_DATE, {
                    open: _open,
                  })
                }
              />
            </div>

            <div className={"flex flex-row gap-1"}>
              <div
                className={
                  "text box-border flex h-[32px] min-w-[150px] items-center gap-2"
                }>
                <UserIcon
                  size={"16px"}
                  color={
                    [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                      ? "#B3B3B3"
                      : "#666666"
                  }
                />
                <p className={"text-[12px] text-text300"}>Prospect</p>
              </div>
              <ProspectsDropdown
                dropdownId={DropdownId.PROSPECTS}
                trigger={
                  <div className={"flex items-center gap-2"}>
                    <Avatar
                      src={null}
                      alt={
                        curProspect?.fields
                          .find((ele) => ele.name === "name")
                          ?.value.split(" ")[0] ?? ""
                      }
                      fallbackName={
                        curProspect?.fields
                          .find((ele) => ele.name === "name")
                          ?.value.split(" ")[0] ?? ""
                      }
                      classNames={{
                        root: "w-[16px] h-[16px] rounded-[50%]",
                        fallback: "w-[16px] h-[16px] text-[12px] rounded-[50%]",
                      }}
                    />
                    <p className={"text-200 text-[13px]"}>
                      {curProspect?.fields.find((ele) => ele.name === "name")?.value ??
                        "---"}
                    </p>
                  </div>
                }
                selectedProspectId={prospectId}
                setSelectedProspectId={setProspectId}
              />
            </div>
          </div>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={"Enter any notes for the task"}
          className={cn(
            "h-full w-full bg-bodyPrimary p-4 text-[13px] text-text200 outline-none",
            !activeTaskId ? "pointer-events-none opacity-30" : "",
          )}
        />
      </div>
    </Drawer>
  );
};
