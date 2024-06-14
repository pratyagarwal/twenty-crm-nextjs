import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {"SideNav"}
      {children}
    </div>
  );
};

export default Layout;
