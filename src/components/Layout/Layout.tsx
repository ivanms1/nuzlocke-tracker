import React from "react";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full px-10 py-6">{children}</div>
    </div>
  );
}

export default Layout;
