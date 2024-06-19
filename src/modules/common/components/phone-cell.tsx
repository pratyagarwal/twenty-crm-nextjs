import React, { FC, useEffect, useMemo, useState } from "react";
import { CopyIcon } from "~lib/assets";
import { Popover } from "~lib/components/popover";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { CountryCodeDropdown } from "~modules/common/components/country-code-dropdown";
import { CountryCodes, DropdownId } from "~modules/common/constants";
import { dropdownStore } from "~modules/common/stores/dropdown-store";

export interface IPhoneCellProps {
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

export const PhoneCell: FC<IPhoneCellProps> = ({
  fieldName,
  fieldValue,
  prospectId,
  updateProspectField,
  isSelected = false,
}) => {
  const { theme } = themeStore();
  const { getOrCreateDropdownState, updateDropdownState } = dropdownStore();
  const { open: editModeOpen } = getOrCreateDropdownState(
    `${DropdownId.CELL_PHONE}-${prospectId}`,
  );
  const [fieldValueInternal, setFieldValueInternal] = useState(fieldValue);
  const [selectedCountryCodeId, setSelectedCountryCodeId] = useState(
    CountryCodes.find((ele) => ele.code === fieldValue.slice(1, 3))?.id ??
      CountryCodes[0].id,
  );
  const selectedCountryCode = useMemo(() => {
    return (
      CountryCodes.find((ele) => ele.id === selectedCountryCodeId) ?? CountryCodes[0]
    );
  }, [selectedCountryCodeId]);

  const SelectedCountryIcon = selectedCountryCode.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fieldValueInternal.trim()) {
        updateProspectField(
          prospectId,
          fieldName,
          `+${selectedCountryCode.code}${fieldValueInternal.slice(3)}`,
        );
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [
    fieldValueInternal,
    fieldName,
    prospectId,
    updateProspectField,
    selectedCountryCode,
  ]);

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
              {`+${selectedCountryCode.code}${fieldValueInternal.slice(3)}`}
            </p>
          </div>
        }
        open={editModeOpen}
        onOpenChange={(_open) =>
          updateDropdownState(`${DropdownId.CELL_PHONE}-${prospectId}`, {
            open: _open,
          })
        }>
        <div
          className={
            "z-[999999] flex h-[32px] w-[220px] flex-row items-center gap-2 bg-bodySecondary"
          }>
          <CountryCodeDropdown
            trigger={
              <div
                onClick={() =>
                  updateDropdownState(`${DropdownId.CELL_PHONE_CODE}-${prospectId}`, {
                    open: true,
                  })
                }
                className={
                  "flex h-[28px] w-[40px] scale-75 items-center border border-solid border-border200 bg-bodyPrimary"
                }>
                <div
                  className={"h-[36px] w-[24px] translate-x-[5px] translate-y-[10px]"}>
                  <SelectedCountryIcon />
                </div>
              </div>
            }
            dropdownId={`${DropdownId.CELL_PHONE_CODE}-${prospectId}`}
            selectedCountryCodeId={selectedCountryCodeId}
            setSelectedCountryCodeId={setSelectedCountryCodeId}
          />
          <input
            autoFocus={true}
            value={`+${selectedCountryCode.code}${fieldValueInternal.slice(3)}`}
            onChange={(e) => setFieldValueInternal(e.target.value)}
            className={
              "h-full w-[140px] overflow-scroll rounded bg-bodySecondary p-2 pl-1 text-[13px] text-text200 outline-none"
            }></input>
          <button
            onClick={() =>
              navigator.clipboard
                .writeText(`+${selectedCountryCode.code}${fieldValueInternal.slice(3)}`)
                .then()
            }
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
