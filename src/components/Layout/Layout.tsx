import React from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div className="h-screen px-60 py-28">{children}</div>;
}

export default Layout;
