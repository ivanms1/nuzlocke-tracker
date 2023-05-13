import React from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div className="px-60 py-28">{children}</div>;
}

export default Layout;
