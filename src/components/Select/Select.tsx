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

interface SelectProps extends SelectPrimitive.SelectProps {
  className?: string;
  options?: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  optionClassName?: string;
  inputClassName?: string;
  label?: string;
}

function Select({
  options,
  placeholder,
  className,
  inputClassName,
  optionClassName,
  label,
  ...props
}: SelectProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label>{label}</Label>}
      <SelectComponent {...props}>
        <SelectTrigger className={inputClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={className}>
          <SelectGroup>
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
    </div>
  );
}

export default Select;
