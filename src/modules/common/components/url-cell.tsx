import { FC, useEffect, useState } from "react";
import { CopyIcon } from "~lib/assets";
import { Popover } from "~lib/components/popover";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { DropdownId } from "~modules/common/constants";
import { dropdownStore } from "~modules/common/stores/dropdown-store";

export interface IUrlCellProps {
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

export const UrlCell: FC<IUrlCellProps> = ({
  fieldName,
  fieldValue,
  prospectId,
  updateProspectField,
  isSelected = false,
}) => {
  const { theme } = themeStore();
  const { getOrCreateDropdownState, updateDropdownState } = dropdownStore();
  const { open } = getOrCreateDropdownState(
    `${DropdownId.CELL_URL}-${prospectId}-${fieldName}`,
  );
  const [fieldValueInternal, setFieldValueInternal] = useState(fieldValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fieldValueInternal.trim()) {
        updateProspectField(prospectId, fieldName, fieldValueInternal);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [fieldValueInternal, fieldName, prospectId, updateProspectField]);

  return (
    <div className={"relative"}>
      <Popover
        align={"start"}
        sideOffset={-35}
        trigger={
          <div
            className={cn(
              "box-border flex h-[32px] min-w-[200px] items-center border-b border-r border-solid border-border200 p-2",
              isSelected ? "bg-activeCell" : "",
            )}>
            <p
              className={
                "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all text-[13px] text-text200"
              }>
              {fieldValueInternal.length ? fieldValueInternal : "-"}
            </p>
          </div>
        }
        open={open}
        onOpenChange={(_open) =>
          updateDropdownState(`${DropdownId.CELL_URL}-${prospectId}-${fieldName}`, {
            open: _open,
          })
        }>
        <div className={"flex h-[32px] w-[220px] items-center gap-2"}>
          <input
            autoFocus={true}
            value={fieldValueInternal}
            onChange={(e) => setFieldValueInternal(e.target.value)}
            className={
              "z-[9999] h-[32px] w-[180px] overflow-scroll rounded bg-bodySecondary p-2 text-[13px] text-text200 outline-none"
            }
          />
          <button
            onClick={() => navigator.clipboard.writeText(fieldValueInternal).then()}
            className={
              "flex items-center justify-center rounded p-1 outline-none transition-all duration-200 ease-in hover:bg-bgHover100"
            }>
            <CopyIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#666666"
                  : "#B3B3B3"
              }
            />
          </button>
        </div>
      </Popover>
    </div>
  );
};
