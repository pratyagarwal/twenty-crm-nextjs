import { FC, PropsWithChildren } from "react";
import { SettingsSidenav } from "~modules/settings/views/settings/layouts";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={"h-screen"}>
      <SettingsSidenav />
      {children}
    </div>
  );
};

export default Layout;
