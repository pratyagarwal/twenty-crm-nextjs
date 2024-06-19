import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { DateTimePicker } from "~lib/components/datetime-picker/datetime-picker";
import { cn } from "~lib/utils";
import { DropdownId } from "~modules/common/constants";
import { dropdownStore } from "~modules/common/stores/dropdown-store";

export interface IDatetimeCellProps {
  fieldName: string;
  fieldValue: string;
  prospectId: string;
  updateProspectField: (
    prospectId: string,
    fieldName: string,
    fieldValue: string,
  ) => void;
  isSelected?: boolean;
}

export const DatetimeCell: FC<IDatetimeCellProps> = ({
  fieldName,
  fieldValue,
  prospectId,
  updateProspectField,
  isSelected = false,
}) => {
  const pathname = usePathname();
  const { getOrCreateDropdownState, updateDropdownState } = dropdownStore();
  const { open } = getOrCreateDropdownState(
    `${DropdownId.CELL_DATETIME}-${prospectId}`,
  );
  const [selectedDatetime, setSelectedDatetime] = useState<Date | null>(
    dayjs(fieldValue).toDate(),
  );

  useEffect(() => {
    if (selectedDatetime) {
      updateProspectField(prospectId, fieldName, dayjs(selectedDatetime).format());
    }
  }, [fieldName, prospectId, updateProspectField, selectedDatetime]);

  return (
    <div className={"relative"}>
      <DateTimePicker
        datetime={selectedDatetime}
        setDatetime={(_datetime) => setSelectedDatetime(_datetime)}
        trigger={
          <div
            className={cn(
              "box-border flex h-[32px] min-w-[200px] items-center p-2",
              isSelected ? "bg-activeCell" : "",
              pathname === "/prospects"
                ? "border-b border-r border-solid border-border200"
                : "",
            )}>
            <p
              className={
                "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all text-[13px] text-text200"
              }>
              {dayjs(selectedDatetime).format("DD MMM YYYY - HH:mm") !== "Invalid Date"
                ? dayjs(selectedDatetime).format("DD MMM YYYY - HH:mm")
                : "-"}
            </p>
          </div>
        }
        open={open}
        onOpenChange={(_open) =>
          updateDropdownState(`${DropdownId.CELL_DATETIME}-${prospectId}`, {
            open: _open,
          })
        }
      />
    </div>
  );
};
