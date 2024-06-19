import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { CheckIcon } from "~lib/assets";
import { Popover } from "~lib/components/popover";
import { AppTheme, themeStore } from "~lib/theme";
import { CountryCodes } from "~modules/common/constants";
import { dropdownStore } from "~modules/common/stores/dropdown-store";

export interface ICompanyDropdown {
  dropdownId: string;
  trigger: ReactNode;
  selectedCountryCodeId: string;
  setSelectedCountryCodeId: Dispatch<SetStateAction<string>>;
}

export const CountryCodeDropdown: FC<ICompanyDropdown> = ({
  dropdownId,
  trigger,
  selectedCountryCodeId,
  setSelectedCountryCodeId,
}) => {
  const { theme } = themeStore();
  const { getOrCreateDropdownState, updateDropdownState } = dropdownStore();
  const { open } = getOrCreateDropdownState(dropdownId);
  const selectedCountryCode = CountryCodes.find(
    (countryCode) => countryCode.id === selectedCountryCodeId,
  );

  return (
    <Popover
      align={"start"}
      side={"bottom"}
      sideOffset={10}
      alignOffset={-5}
      trigger={trigger}
      open={open}
      onOpenChange={(_open) => updateDropdownState(dropdownId, { open: _open })}>
      <div className={"flex w-[220px] flex-col gap-1"}>
        <div className={"flex w-full cursor-pointer flex-col gap-1 pb-1"}>
          {CountryCodes.map((countryCode) => {
            const CountryIcon = countryCode.icon;
            return (
              <div
                onClick={() => {
                  setSelectedCountryCodeId(countryCode.id);
                  updateDropdownState(dropdownId, { open: false });
                }}
                key={countryCode.id}
                className={
                  "relative ml-1 flex h-[28px] w-[200px] flex-row items-center gap-2 rounded hover:bg-bgHover100"
                }>
                <div className={"flex h-[28px] w-[40px] scale-75 items-center"}>
                  <div
                    className={
                      "h-[36px] w-[24px] translate-x-[5px] translate-y-[10px]"
                    }>
                    <CountryIcon />
                  </div>
                </div>
                <p className={"text-200 text-[13px]"}>{countryCode.name}</p>
                <div className={"absolute right-1 top-[50%] translate-y-[-50%]"}>
                  {selectedCountryCode?.id === countryCode.id ? (
                    <CheckIcon
                      color={
                        [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                          ? "#333333"
                          : "#EBEBEB"
                      }
                      size={"14px"}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Popover>
  );
};
