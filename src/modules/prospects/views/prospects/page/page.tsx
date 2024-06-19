"use client";
import { FC, useCallback, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CollapseRightIcon, PlusIcon, TrashIcon, UserIcon } from "~lib/assets";
import { Checkbox } from "~lib/components/checkbox";
import { Popover } from "~lib/components/popover";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { DrawerId, DropdownId, FieldType } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";
import { dropdownStore } from "~modules/common/stores/dropdown-store";
import { prospectsStore } from "~modules/prospects/store";
import { getFilterIconByName } from "~modules/prospects/utils";
import { ManageCell } from "~modules/common/components";

export const Page: FC = () => {
  const { getOrCreateDropdownState, updateDropdownState } = dropdownStore();
  const { open: createProspectOpen } = getOrCreateDropdownState(
    DropdownId.CREATE_PROSPECT,
  );
  const { theme } = themeStore();
  const { prospects, deleteProspects, updateProspectField, addProspect } =
    prospectsStore();
  const { getOrCreateDrawerState, updateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.PRIMARY_SIDENAV);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [selectedProspectIds, setSelectedProspectIds] = useState<string[]>([]);
  const tableData = useMemo(() => {
    const tableData: Record<string, string>[] = [];

    prospects.forEach((prospect) => {
      let prospectData = {
        [`__${FieldType.CHECKBOX}`]: `${prospect.id}__`,
      };
      prospect.fields.forEach((field) => {
        prospectData = {
          ...prospectData,
          [`${field.name}__${field.type}`]: `${prospect.id}__${field.value}`,
        };
      });
      tableData.push(prospectData);
    });

    return tableData;
  }, [prospects]);

  const isAllSelected = useMemo(() => {
    return prospects.every((prospect) => selectedProspectIds.includes(prospect.id));
  }, [prospects, selectedProspectIds]);

  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedProspectIds([]);
    } else {
      setSelectedProspectIds((prev) => {
        const newSelectedIds = [...prev];
        prospects.forEach((prospect) => {
          if (!newSelectedIds.includes(prospect.id)) {
            newSelectedIds.push(prospect.id);
          }
        });
        return newSelectedIds;
      });
    }
  }, [prospects, isAllSelected]);

  const handleSelectProspect = useCallback(
    (prospectId: string) => {
      if (selectedProspectIds.includes(prospectId)) {
        setSelectedProspectIds((prev) => [...prev].filter((ele) => ele !== prospectId));
      } else {
        setSelectedProspectIds((prev) => [...prev, prospectId]);
      }
    },
    [selectedProspectIds],
  );

  const handleDelete = useCallback(() => {
    deleteProspects(selectedProspectIds);
    setSelectedProspectIds([]);
  }, [deleteProspects, selectedProspectIds]);

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

  const tableColumns = useMemo(() => {
    const colDefs: ColumnDef<Record<string, string>, string>[] = [];

    if (tableData.length > 0) {
      Object.keys(tableData[0]).map((key) => {
        const Icon = getFilterIconByName(key.split("__")[0]);
        colDefs.push({
          accessorKey: key,
          header: () => {
            const fieldType = key.split("__")[1];
            if (fieldType === FieldType.CHECKBOX.toString()) {
              return (
                <div
                  className={
                    "text box-border flex h-[32px] w-[50px] translate-y-[-1px] items-center border-b border-t border-solid border-border200 p-2"
                  }>
                  <Checkbox
                    checked={isAllSelected}
                    setChecked={() => handleSelectAll()}
                  />
                </div>
              );
            }
            return (
              <div
                className={
                  "text box-border flex h-[32px] min-w-[200px] items-center gap-2 border-b border-r border-t border-solid border-border200 p-2"
                }>
                <Icon
                  size={"16px"}
                  color={
                    [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                      ? "#666666"
                      : "#B3B3B3"
                  }
                />
                <p className={"text-[13px] text-text400"}>
                  {getVerboseName(key.split("__")[0])}
                </p>
              </div>
            );
          },
          cell: (props) => {
            const fieldType = key.split("__")[1];
            const fieldValue = props.getValue().toString().split("__")[1];
            const prospectId = props.getValue().toString().split("__")[0];

            if (fieldType === FieldType.CHECKBOX.toString()) {
              return (
                <div
                  className={
                    "text box-border flex h-[32px] w-[50px] translate-y-[2.5px] items-center border-b border-solid border-border200 p-2"
                  }>
                  <Checkbox
                    setChecked={() => handleSelectProspect(prospectId)}
                    checked={[...selectedProspectIds].includes(prospectId)}
                  />
                </div>
              );
            }

            return (
              <ManageCell
                fieldType={fieldType}
                fieldName={key.split("__")[0]}
                fieldValue={fieldValue}
                prospectId={prospectId}
                updateProspectField={updateProspectField}
                isSelected={selectedProspectIds.includes(prospectId)}
              />
            );
          },
        });
      });
    }

    return [...colDefs];
  }, [
    tableData,
    theme,
    isAllSelected,
    handleSelectAll,
    updateProspectField,
    selectedProspectIds,
    handleSelectProspect,
  ]);

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

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
            <p className={cn("text-[13px] font-medium text-text200")}>Prospects</p>
          </div>
        </div>
        <Popover
          align={"start"}
          side={"left"}
          sideOffset={10}
          trigger={
            <button
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
          }
          open={createProspectOpen}
          onOpenChange={(_open) =>
            updateDropdownState(DropdownId.CREATE_PROSPECT, {
              open: _open,
            })
          }>
          <div
            className={
              "flex h-[34px] w-[300px] items-center gap-1 bg-bodySecondary px-4"
            }>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={"First Name"}
              className={
                "h-[32px] w-[100px] bg-bodySecondary text-[13px] text-text200 outline-none"
              }
            />
            <span className={"text-[13px] text-text300"}>|</span>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={"Last Name"}
              className={
                "h-[32px] w-[100px] bg-bodySecondary text-[13px] text-text200 outline-none"
              }
            />
            <button
              onClick={() => addProspect(`${firstName} ${lastName}`)}
              className={cn(
                "flex h-[20px] items-center rounded p-2 text-[13px] text-text200 hover:border-border200",
                `${firstName}${lastName}`.length
                  ? "hover:bg-bgHover100"
                  : "pointer-events-none opacity-40",
              )}>
              Create
            </button>
          </div>
        </Popover>
      </div>
      <div
        className={
          "relative mr-3 h-[calc(100%-72px)] rounded-md border border-solid border-border100 bg-bodyPrimary pl-2"
        }>
        <div className={"h-[40px] w-full"}></div>
        <div className={"h-full w-full overflow-scroll"}>
          <table className={"relative"}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id}>
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {selectedProspectIds.length > 0 ? (
          <div
            className={
              "absolute bottom-[50px] left-[50%] flex h-[50px] w-[230px] translate-x-[-50%] flex-row items-center justify-center gap-2 rounded-md border border-solid border-border100 bg-bodySecondary px-[8px] shadow"
            }>
            <p
              className={
                "text-[13px] text-text400"
              }>{`${selectedProspectIds.length} selected:`}</p>
            <button
              onClick={handleDelete}
              className={
                "flex h-[32px] w-[80px] flex-row items-center justify-center gap-1 rounded px-[8px] hover:bg-[#2D1B1B]"
              }>
              <div>
                <TrashIcon size={"16"} color={"#F83E3E"} />
              </div>
              <p className={"text-[13px] text-[#F83E3E]"}>Delete</p>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
