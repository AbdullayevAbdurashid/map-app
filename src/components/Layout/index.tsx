import React from "react";
import Sidebar from "../Sidebar";
import { LayoutProps } from "../../types";

const Layout: React.FC<LayoutProps> = ({ children, sidebarContent }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar>{sidebarContent}</Sidebar>
      <main className="flex-grow overflow-hidden">{children}</main>
    </div>
  );
};

export default Layout;
