import { cn } from "@/utils/cn";
import * as React from "react";

import Label from "../Label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, wrapperClassName, error, ...props }, ref) => {
    return (
      <div className={cn("grid items-center gap-1.5", wrapperClassName)}>
        {label && <Label>{label}</Label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            { "border-red-600": !!error },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

export default Input;

Input.displayName = "Input";
