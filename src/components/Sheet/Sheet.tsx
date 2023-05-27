import * as SheetPrimitive from "@radix-ui/react-dialog";

import {
  Sheet as SheetComponent,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./Components";

interface SheetProps extends SheetPrimitive.DialogProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  size?: "content" | "default" | "sm" | "lg" | "xl" | "full";
  className?: string;
}

function Sheet({
  title,
  description,
  children,
  position,
  size,
  className,
  ...props
}: SheetProps) {
  return (
    <SheetComponent {...props}>
      <SheetContent className={className} position={position} size={size}>
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
