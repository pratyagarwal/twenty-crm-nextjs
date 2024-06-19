"use client";
import { FC, useMemo, useState } from "react";
import {
  CheckIcon,
  CollapseRightIcon,
  EmailIcon,
  NoteIcon,
  PlusIcon,
  UserIcon,
} from "~lib/assets";
import { Avatar } from "~lib/components/avatar";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { getTimeFromNow } from "~lib/utils/datetime";
import { CompanyCell, ManageCell, Tabs } from "~modules/common/components";
import { Companies, DrawerId, FieldType } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";
import { prospectsStore } from "~modules/prospects/store";
import { getFilterIconByName } from "~modules/prospects/utils";

export interface IPageProps {
  id: string;
}

export const Page: FC<IPageProps> = ({ id }) => {
  const { theme } = themeStore();

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
        {/*<Popover*/}
        {/*  align={"start"}*/}
        {/*  side={"left"}*/}
        {/*  sideOffset={10}*/}
        {/*  trigger={*/}
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
        {/*  }*/}
        {/*  open={createProspectOpen}*/}
        {/*  onOpenChange={(_open) =>*/}
        {/*    updateDropdownState(DropdownId.CREATE_PROSPECT, {*/}
        {/*      open: _open,*/}
        {/*    })*/}
        {/*  }>*/}
        {/*  <div*/}
        {/*    className={*/}
        {/*      "flex h-[34px] w-[300px] items-center gap-1 bg-bodySecondary px-4"*/}
        {/*    }>*/}
        {/*    <input*/}
        {/*      value={firstName}*/}
        {/*      onChange={(e) => setFirstName(e.target.value)}*/}
        {/*      placeholder={"First Name"}*/}
        {/*      className={*/}
        {/*        "h-[32px] w-[100px] bg-bodySecondary text-[13px] text-text200 outline-none"*/}
        {/*      }*/}
        {/*    />*/}
        {/*    <span className={"text-[13px] text-text300"}>|</span>*/}
        {/*    <input*/}
        {/*      value={lastName}*/}
        {/*      onChange={(e) => setLastName(e.target.value)}*/}
        {/*      placeholder={"Last Name"}*/}
        {/*      className={*/}
        {/*        "h-[32px] w-[100px] bg-bodySecondary text-[13px] text-text200 outline-none"*/}
        {/*      }*/}
        {/*    />*/}
        {/*    <button*/}
        {/*      onClick={() => addProspect(`${firstName} ${lastName}`)}*/}
        {/*      className={cn(*/}
        {/*        "flex h-[20px] items-center rounded p-2 text-[13px] text-text200 hover:border-border200",*/}
        {/*        `${firstName}${lastName}`.length*/}
        {/*          ? "hover:bg-bgHover100"*/}
        {/*          : "pointer-events-none opacity-40",*/}
        {/*      )}>*/}
        {/*      Create*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</Popover>*/}
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
        </div>
      </div>
    </div>
  );
};
