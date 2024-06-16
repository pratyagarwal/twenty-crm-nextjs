"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { CollapseLeftIcon, FiberLogo } from "~lib/assets";
import { CheckboxIcon, SearchIcon, SettingsIcon, UserIcon } from "~lib/assets/icons";
import { Drawer } from "~lib/components";
import { cn } from "~lib/utils";
import { SideNavItem } from "~modules/common/components";
import { DrawerId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";

export const PrimarySideNav: FC = () => {
  const pathName = usePathname();
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
      items: [{ icon: UserIcon, text: "People" }],
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
      classNames={{
        content: "w-[236px]",
      }}>
      <div
        className={"fixed left-0 top-0 h-screen w-[236px] px-2 pb-4 pt-4"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div
          className={"mb-3 flex h-8 w-full flex-row items-center justify-between p-1"}>
          <div className={"flex flex-row gap-2"}>
            <Image
              src={FiberLogo}
              alt={"fiber-logo.png"}
              width={16}
              height={16}
              className={"h-4 w-4"}
            />
            <p className={"text-[13px] font-medium text-textPrimaryHover"}>Fiber.ai</p>
          </div>
          <button
            className={cn(
              "flex items-center justify-center rounded p-1 outline-none transition-all duration-200 ease-in hover:bg-[#FFFFFF0F]",
              hovered ? "opacity-100" : "opacity-0",
            )}
            onClick={() => {
              updateDrawerState(DrawerId.PRIMARY_SIDENAV, { open: false });
            }}>
            <CollapseLeftIcon size={"16"} color={"#B3B3B3"} />
          </button>
        </div>
        <div className={"flex flex-col gap-9"}>
          {navSections.map((navSection, sectionIndex) => {
            return (
              <div key={`nav-section-${sectionIndex}`} className={"w-full"}>
                {navSection.label ? (
                  <h3
                    className={
                      "pb-1 pl-1 text-[11px] font-semibold text-textSecondary"
                    }>
                    {navSection.label}
                  </h3>
                ) : null}
                <div className={"flex flex-col gap-0.5"}>
                  {navSection.items.map((item, itemIndex) => {
                    return (
                      <Link
                        onClick={() =>
                          item.text !== "Search" &&
                          setSelectedNavItem(item.text.toLowerCase())
                        }
                        key={`nav-section-item-${sectionIndex}-${itemIndex}`}
                        href={
                          item.text !== "Search"
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
      </div>
    </Drawer>
  );
};
