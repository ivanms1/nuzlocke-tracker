import React from "react";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="px-4 py-6">{children}</div>
    </div>
  );
}

export default Layout;
