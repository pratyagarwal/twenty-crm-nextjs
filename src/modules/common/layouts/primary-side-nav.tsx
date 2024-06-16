"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { BuildingIcon, CollapseLeftIcon, FiberLogo } from "~lib/assets";
import { CheckboxIcon, SearchIcon, SettingsIcon, UserIcon } from "~lib/assets/icons";
import { Drawer } from "~lib/components";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { SideNavItem } from "~modules/common/components";
import { DrawerId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";
import { workspaceUsersStore } from "~modules/common/stores/workspace-users-store";

export const PrimarySideNav: FC = () => {
  const pathName = usePathname();
  const { theme } = themeStore();
  const { workspace, users } = workspaceUsersStore();
  const authUser = useMemo(() => {
    return users.find((user) => user.isAuthUser);
  }, [users]);

  const [selectedNavItem, setSelectedNavItem] = useState(
    pathName !== "/" ? pathName.slice(1) : "people",
  );
  const [hovered, setHovered] = useState(false);
  const { updateDrawerState, getOrCreateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.PRIMARY_SIDENAV);

  const navSections = [
    {
      label: "",
      items: [
        { icon: SearchIcon, text: "Search" },
        { icon: SettingsIcon, text: "Settings" },
        { icon: CheckboxIcon, text: "Tasks" },
      ],
    },
    {
      label: "Workspace",
      items: [
        { icon: UserIcon, text: "People" },
        { icon: BuildingIcon, text: "Companies" },
      ],
    },
  ];

  return (
    <Drawer
      trigger={<div />}
      open={open}
      onOpenChange={(_open) =>
        updateDrawerState(DrawerId.PRIMARY_SIDENAV, { open: _open })
      }
      isBackgroundInteractive={true}
      isEscapeKeyDisabled={true}
      classNames={{
        content: "w-[236px]",
      }}>
      <div
        className={"fixed relative left-0 top-0 h-screen w-[236px] px-2 pb-4 pt-4"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div
          className={"mb-3 flex h-8 w-full flex-row items-center justify-between p-1"}>
          <div className={"flex flex-row gap-2"}>
            <Image
              src={
                workspace.profile ? URL.createObjectURL(workspace.profile) : FiberLogo
              }
              alt={"fiber-logo.png"}
              width={16}
              height={16}
              className={"h-4 w-4 rounded"}
            />
            <p className={"text-[13px] font-medium text-text200"}>{workspace.name}</p>
          </div>
          <button
            className={cn(
              "flex items-center justify-center rounded p-1 outline-none transition-all duration-200 ease-in hover:bg-bgHover100",
              hovered ? "opacity-100" : "opacity-0",
            )}
            onClick={() => {
              updateDrawerState(DrawerId.PRIMARY_SIDENAV, { open: false });
            }}>
            <CollapseLeftIcon
              size={"16"}
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#666666"
                  : "#B3B3B3"
              }
            />
          </button>
        </div>
        <div className={"flex flex-col gap-9"}>
          {navSections.map((navSection, sectionIndex) => {
            return (
              <div key={`nav-section-${sectionIndex}`} className={"w-full"}>
                {navSection.label ? (
                  <h3 className={"pb-1 pl-1 text-[11px] font-semibold text-text300"}>
                    {navSection.label}
                  </h3>
                ) : null}
                <div className={"flex flex-col gap-0.5"}>
                  {navSection.items.map((item, itemIndex) => {
                    return (
                      <Link
                        onClick={() =>
                          !["Search", "Companies"].includes(item.text) &&
                          setSelectedNavItem(item.text.toLowerCase())
                        }
                        key={`nav-section-item-${sectionIndex}-${itemIndex}`}
                        href={
                          !["Search", "Companies"].includes(item.text)
                            ? `/${item.text.toLowerCase()}`
                            : `/${selectedNavItem.toLowerCase()}`
                        }>
                        <SideNavItem
                          icon={item.icon}
                          itemText={item.text}
                          isActive={selectedNavItem === item.text.toLowerCase()}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={
            "absolute bottom-[32px] left-[16px] flex flex-row items-center gap-2"
          }>
          {authUser?.profile ? (
            <Image
              src={URL.createObjectURL(authUser.profile)}
              alt={"user-profile"}
              width={50}
              height={50}
              className={"h-[20px] w-[20px] rounded-[50%]"}
            />
          ) : null}
          <p
            className={
              "text-[13px] font-medium text-text200"
            }>{`${authUser!.firstName} ${authUser!.lastName}`}</p>
        </div>
      </div>
    </Drawer>
  );
};
