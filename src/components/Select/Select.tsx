import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import Label from "../Label";

import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Components";

export interface SelectProps extends SelectPrimitive.SelectProps {
  className?: string;
  options?: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  optionClassName?: string;
  inputClassName?: string;
  label?: string;
  error?: string;
}

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectProps
>(
  (
    {
      options,
      placeholder,
      className,
      inputClassName,
      optionClassName,
      label,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className="grid items-center gap-1.5">
        {label && <Label>{label}</Label>}
        <SelectComponent {...props}>
          <SelectTrigger className={inputClassName}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className={className}>
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  className={optionClassName}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectComponent>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
