import Image from "next/image";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CheckIcon } from "~lib/assets";
import { Popover } from "~lib/components/popover";
import { AppTheme, themeStore } from "~lib/theme";
import { Companies } from "~modules/common/constants";
import { dropdownStore } from "~modules/common/stores/dropdown-store";

export interface ICompanyDropdown {
  dropdownId: string;
  trigger: ReactNode;
  selectedCompanyId: string | null;
  setSelectedCompanyId: Dispatch<SetStateAction<string | null>>;
}

export const CompanyDropdown: FC<ICompanyDropdown> = ({
  dropdownId,
  trigger,
  selectedCompanyId,
  setSelectedCompanyId,
}) => {
  const { theme } = themeStore();
  const { getOrCreateDropdownState, updateDropdownState } = dropdownStore();
  const { open } = getOrCreateDropdownState(dropdownId);
  const [search, setSearch] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(Companies);
  const selectedCompany = Companies.find((company) => company.id === selectedCompanyId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredCompanies(
        Companies.filter((ele) =>
          ele.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <Popover
      trigger={trigger}
      open={open}
      onOpenChange={(_open) => updateDropdownState(dropdownId, { open: _open })}>
      <div className={"flex w-[200px] flex-col gap-1"}>
        <input
          placeholder={"Search"}
          className={
            "h-[36px] w-[full] border-b border-solid border-border200 bg-bodySecondary pl-2 text-[13px] text-text200 outline-none"
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={"flex w-full cursor-pointer flex-col gap-1 pb-1"}>
          {[...filteredCompanies].find((ele) => ele.id === selectedCompanyId) ? (
            <div
              key={selectedCompanyId}
              className={
                "pointer-events-none relative flex h-[28px] w-[full] flex-row items-center gap-2 rounded border-b border-solid border-border200 pl-2 opacity-80"
              }>
              <Image
                src={selectedCompany!.url}
                alt={selectedCompany!.name}
                className={"h-[14px] w-[14px]"}
              />
              <p className={"text-200 text-[13px]"}>{selectedCompany!.name}</p>
              <div className={"absolute right-2 top-[50%] translate-y-[-50%]"}>
                <CheckIcon
                  color={
                    [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                      ? "#333333"
                      : "#EBEBEB"
                  }
                  size={"14px"}
                />
              </div>
            </div>
          ) : null}
          {[...filteredCompanies]
            .filter((ele) => ele.id !== selectedCompanyId)
            .map((company) => {
              return (
                <div
                  onClick={() => {
                    setSelectedCompanyId(company.id);
                    updateDropdownState(dropdownId, { open: false });
                  }}
                  key={company.id}
                  className={
                    "ml-1 flex h-[28px] w-[170px] flex-row items-center gap-2 rounded pl-1 hover:bg-bgHover100"
                  }>
                  <Image
                    src={company.url}
                    alt={company.name}
                    className={"h-[14px] w-[14px]"}
                  />
                  <p className={"text-200 text-[13px]"}>{company.name}</p>
                </div>
              );
            })}
        </div>
      </div>
    </Popover>
  );
};
