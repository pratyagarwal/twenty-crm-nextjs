import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CheckIcon } from "~lib/assets";
import { Avatar } from "~lib/components/avatar";
import { Popover } from "~lib/components/popover";
import { AppTheme, themeStore } from "~lib/theme";
import { dropdownStore } from "~modules/common/stores/dropdown-store";
import { prospectsStore } from "~modules/prospects/store";

export interface ICompanyDropdown {
  dropdownId: string;
  trigger: ReactNode;
  selectedProspectId: string | null;
  setSelectedProspectId: Dispatch<SetStateAction<string | null>>;
}

export const ProspectsDropdown: FC<ICompanyDropdown> = ({
  dropdownId,
  trigger,
  selectedProspectId,
  setSelectedProspectId,
}) => {
  const { theme } = themeStore();
  const { prospects } = prospectsStore();
  const { getOrCreateDropdownState, updateDropdownState } = dropdownStore();
  const { open } = getOrCreateDropdownState(dropdownId);
  const [search, setSearch] = useState("");
  const [filteredProspects, setFilteredProspects] = useState(prospects);
  const selectedProspect = prospects.find(
    (prospect) => prospect.id === selectedProspectId,
  );
  const selectedProspectName = useMemo(() => {
    return selectedProspect?.fields.find((ele) => ele.name === "name")?.value;
  }, [selectedProspect]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredProspects(
        prospects.filter((prospect) =>
          prospect.fields
            .find((ele) => ele.name === "name")
            ?.value.toLowerCase()
            .includes(search.toLowerCase()),
        ),
      );
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [prospects, search]);

  return (
    <Popover
      align={"start"}
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
          {[...filteredProspects].find((ele) => ele.id === selectedProspectId) ? (
            <div
              className={
                "pointer-events-none relative flex h-[28px] w-[full] flex-row items-center gap-2 rounded border-b border-solid border-border200 pl-2 opacity-80"
              }>
              <Avatar
                src={null}
                alt={selectedProspectName ?? ""}
                fallbackName={selectedProspectName ?? ""}
                classNames={{
                  root: "w-[16px] h-[16px] rounded-[50%]",
                  fallback: "w-[16px] h-[16px] text-[12px] rounded-[50%]",
                }}
              />
              <p className={"text-200 text-[13px]"}>{selectedProspectName ?? ""}</p>
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
          {[...filteredProspects]
            .filter((ele) => ele.id !== selectedProspectId)
            .map((prospect) => {
              return (
                <div
                  onClick={() => {
                    setSelectedProspectId(prospect.id);
                    updateDropdownState(dropdownId, { open: false });
                  }}
                  key={prospect.id}
                  className={
                    "flex h-[28px] w-[full] cursor-pointer flex-row items-center gap-2 rounded pl-2 opacity-80 hover:bg-bgHover100"
                  }>
                  <Avatar
                    src={null}
                    alt={
                      prospect.fields.find((ele) => ele.name === "name")?.value ?? ""
                    }
                    fallbackName={
                      prospect.fields.find((ele) => ele.name === "name")?.value ?? ""
                    }
                    classNames={{
                      root: "w-[16px] h-[16px] rounded-[50%]",
                      fallback: "w-[16px] h-[16px] text-[12px] rounded-[50%]",
                    }}
                  />
                  <p className={"text-200 text-[13px]"}>
                    {prospect.fields.find((ele) => ele.name === "name")?.value ?? ""}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </Popover>
  );
};
