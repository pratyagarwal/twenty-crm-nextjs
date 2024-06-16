"use client";
import { FC, useEffect } from "react";
import { AppTheme, themeStore } from "~lib/theme";
import setThemeCookie from "~lib/theme/actions/set-cookie";
import { ThemeCard } from "~modules/settings/views/settings/routes/appearance/page/components/theme-card";

export const Page: FC = () => {
  const { theme } = themeStore();

  useEffect(() => {
    setThemeCookie(theme);
  }, [theme]);

  return (
    <div
      className={
        "ml-[40vw] flex h-full w-[60vw] justify-start transition-all duration-200"
      }>
      <div
        className={
          "my-3 mr-3 h-[calc(100%-24px)] w-full rounded-md border border-solid border-border100 bg-bodyPrimary pl-2"
        }>
        <div className={"flex w-full flex-col gap-8 p-8"}>
          <h2 className={"text-[16px] font-semibold text-text400"}>Appearance</h2>
          <div className={"flex flex-col gap-4"}>
            <h2 className={"text-[13px] font-semibold text-text200"}>Theme</h2>
            <div className={"flex flex-row gap-4"}>
              {[
                AppTheme.LIGHT,
                AppTheme.DARK,
                AppTheme.PURPLE_LIGHT,
                AppTheme.PURPLE_DARK,
              ].map((theme, index) => {
                return <ThemeCard key={`theme-${index}`} theme={theme} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
