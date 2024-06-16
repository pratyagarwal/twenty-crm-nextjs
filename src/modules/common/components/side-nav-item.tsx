import { FC, useState } from "react";
import { IIconProps } from "~lib/assets/types";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";

export const SideNavItem: FC<{
  icon: FC<IIconProps>;
  itemText: string;
  isActive?: boolean;
}> = ({ icon: Icon, itemText, isActive = false }) => {
  const { theme } = themeStore();
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex cursor-pointer flex-row gap-2 rounded p-1",
        [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
          ? "hover:bg-[#0000000A]"
          : "hover:bg-[#FFFFFF0F]",
        isActive
          ? [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
            ? "bg-[#0000000A]"
            : "bg-[#FFFFFF0F]"
          : "",
      )}>
      <Icon
        size={"16"}
        color={
          [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
            ? hovered
              ? "#333333"
              : "#666666"
            : hovered
              ? "#EBEBEB"
              : "#B3B3B3"
        }
      />
      <p className={cn("text-[13px] font-medium", `${hovered ? "text-text200" : ""}`)}>
        {itemText}
      </p>
    </div>
  );
};