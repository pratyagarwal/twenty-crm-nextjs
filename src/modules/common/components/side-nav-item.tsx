import { FC, useState } from "react";
import { IIconProps } from "~lib/assets/types";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";

export const SideNavItem: FC<{
  icon: FC<IIconProps>;
  itemText: string;
  itemShortCut: string;
  isActive?: boolean;
}> = ({ icon: Icon, itemText, isActive = false, itemShortCut }) => {
  const { theme } = themeStore();
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex w-full cursor-pointer flex-row gap-2 rounded p-1 hover:bg-bgHover100",
        isActive ? "bg-bgHover100" : "",
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
      <p
        className={cn(
          "text-[13px] font-medium",
          `${hovered ? "text-text200" : ""}`,
          isActive ? "text-text200" : "",
        )}>
        {itemText}
      </p>
      {hovered ? (
        <p
          className={cn(
            "absolute right-[10px] top-[50%] translate-y-[-50%] text-[13px] font-medium text-text400",
          )}>
          {itemShortCut}
        </p>
      ) : null}
    </div>
  );
};
