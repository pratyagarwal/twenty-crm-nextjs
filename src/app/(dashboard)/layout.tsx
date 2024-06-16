import { FC, PropsWithChildren } from "react";
import { PrimarySideNav } from "~modules/common/layouts/primary-side-nav";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={"h-screen"}>
      <PrimarySideNav />
      {children}
    </div>
  );
};

export default Layout;
