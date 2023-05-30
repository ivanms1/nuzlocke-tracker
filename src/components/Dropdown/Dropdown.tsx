import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./Components";

interface DropdownProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  label?: string;
  content: React.ReactNode;
}

function Dropdown({ children, content, open, label, onClose }: DropdownProps) {
  return (
    <DropdownMenu
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose?.();
        }
      }}
    >
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
