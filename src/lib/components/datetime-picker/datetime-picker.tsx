// noinspection BadExpressionStatementJS
"use client";

import dayjs from "dayjs";
import { Dispatch, FC, ReactNode, SetStateAction, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { CalendarIcon } from "~lib/assets";
import { Popover } from "~lib/components/popover";
import { AppTheme, themeStore } from "~lib/theme";
import "react-day-picker/dist/style.css";
import { cn } from "~lib/utils";

export interface DatetimePickerProps {
  datetime: Date | null;
  setDatetime: Dispatch<SetStateAction<Date | null>>;
  trigger: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DateTimePicker: FC<DatetimePickerProps> = ({
  trigger,
  open,
  onOpenChange,
  datetime,
  setDatetime,
}) => {
  const { theme } = themeStore();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Popover
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      align={"start"}
      sideOffset={-38}>
      <div
        className={
          "relative flex h-[320px] w-[230px] flex-col items-center bg-bodySecondary text-text200"
        }>
        <div
          className={
            "absolute top-0 flex h-[32px] w-full flex-row items-center border-b border-solid border-border200 pl-3.5"
          }>
          <p className={cn("text-[11px] font-medium text-text100")}>
            {dayjs(datetime).format("MM/DD/YYYY")}
          </p>
          <input
            onClick={() => inputRef.current?.showPicker()}
            ref={inputRef}
            type={"time"}
            value={dayjs(datetime).format("HH:mm")}
            placeholder={"hh:mm AM/PM"}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":").map(Number);
              setDatetime((prev) => dayjs(prev).hour(hours).minute(minutes).toDate());
            }}
            className={
              "ml-3 flex h-[24px] w-[90px] items-center rounded border border-solid border-border100 bg-bodySecondary p-2 px-2 text-[11px] font-medium text-text200 outline-none"
            }
          />
        </div>
        <div className={"absolute top-[-15px] h-[352px] w-[312px] scale-[0.75]"}>
          <DayPicker
            numberOfMonths={1}
            mode="single"
            {...(datetime ? { selected: datetime } : {})}
            onSelect={(_datetime) => _datetime && setDatetime(_datetime)}
            showOutsideDays
            initialFocus
          />
        </div>
        <div
          className={
            "absolute bottom-0 flex h-[32px] w-full items-center border-t border-solid border-border200 pl-3"
          }>
          <div
            onClick={() => setDatetime(null)}
            className={cn(
              "flex cursor-pointer flex-row items-center gap-1 rounded p-1 hover:bg-bgHover100",
            )}>
            <CalendarIcon
              size={"12"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#333333"
                  : "#B3B3B3"
              }
            />
            <p className={cn("text-[11px] font-medium text-text100")}>Clear</p>
          </div>
        </div>
      </div>
    </Popover>
  );
};
