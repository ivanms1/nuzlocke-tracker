import * as SheetPrimitive from "@radix-ui/react-dialog";

import {
  Sheet as SheetComponent,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./Components";

interface SheetProps extends SheetPrimitive.DialogProps {
  title?: string;
  description?: string;
  position?: "top" | "bottom" | "left" | "right";
  size?: "content" | "default" | "sm" | "lg" | "xl" | "full";
}

function Sheet({
  title,
  description,
  children,
  position,
  size,
  ...props
}: SheetProps) {
  return (
    <SheetComponent {...props}>
      <SheetContent position={position} size={size}>
        {(title || description) && (
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
        )}
        {children}
      </SheetContent>
    </SheetComponent>
  );
}

export default Sheet;
