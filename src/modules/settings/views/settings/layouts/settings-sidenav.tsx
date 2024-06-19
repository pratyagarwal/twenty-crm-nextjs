"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { ArrowLeftIcon, ProfileIcon, SettingsIcon, SwatchIcon } from "~lib/assets";
import { Drawer } from "~lib/components/dialog/drawer";
import { AppTheme, themeStore } from "~lib/theme";
import { SideNavItem } from "~modules/common/components";
import { DrawerId } from "~modules/common/constants";
import { drawerStore } from "~modules/common/stores/drawer-store";

export const SettingsSidenav: FC = () => {
  const pathName = usePathname();
  const [selectedNavItem, setSelectedNavItem] = useState(
    pathName !== "/settings" ? pathName.split("/settings/")[1] : "profile",
  );
  const { theme } = themeStore();
  const { getOrCreateDrawerState, updateDrawerState } = drawerStore();
  const { open } = getOrCreateDrawerState(DrawerId.SETTINGS_SIDENAV);

  const navSections = [
    {
      label: "User",
      items: [
        { icon: ProfileIcon, text: "Profile" },
        { icon: SwatchIcon, text: "Appearance" },
      ],
    },
    {
      label: "Workspace",
      items: [{ icon: SettingsIcon, text: "General" }],
    },
  ];

  return (
    <Drawer
      trigger={<div />}
      open={open}
      onOpenChange={(_open) =>
        updateDrawerState(DrawerId.SETTINGS_SIDENAV, { open: _open })
      }
      isBackgroundInteractive={true}
      isEscapeKeyDisabled={true}
      classNames={{
        content: "w-[40vw]",
      }}>
      <div className={"fixed left-0 top-0 flex h-screen w-[40vw] justify-end"}>
        <div className={"w-[236px] pb-4 pl-2 pr-8 pt-[42px]"}>
          <Link
            href={"/prospects"}
            className={
              "mb-3 flex h-8 w-full cursor-pointer flex-row items-center gap-2 p-1"
            }>
            <ArrowLeftIcon
              color={
                [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                  ? "#666666"
                  : "#B3B3B3"
              }
            />
            <p className={"text-[16px] font-bold text-text100"}>Settings</p>
          </Link>
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
                          onClick={() => setSelectedNavItem(item.text.toLowerCase())}
                          key={`nav-section-item-${sectionIndex}-${itemIndex}`}
                          href={`/settings/${item.text.toLowerCase()}`}>
                          <SideNavItem
                            itemShortCut={""}
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
      </div>
    </Drawer>
  );
};
