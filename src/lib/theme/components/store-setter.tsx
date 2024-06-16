"use client";

import { FC, useEffect } from "react";
import { themeStore } from "~lib/theme/store";
import { AppTheme } from "~lib/theme/constants";

const StoreSetter: FC<{ theme: AppTheme }> = ({ theme }) => {
  const { setState: setTheme } = themeStore();

  useEffect(() => {
    setTheme({ theme });
  }, [theme, setTheme]);

  return <></>;
};

export default StoreSetter;
