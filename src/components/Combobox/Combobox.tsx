"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../Command/Command";
import Button from "../Button";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";
import Label from "../Label";

import { cn } from "@/utils/cn";

export interface ComboboxProps {
  inputClassname?: string;
  popoverClassName?: string;
  noOptionsText?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  label?: string;
  options?: {
    label: string | number;
    value: string | number;
  }[];
  error?: string;
}

function Combobox({
  inputClassname,
  popoverClassName,
  options,
  noOptionsText,
  placeholder = "Select an option",
  label,
  value,
  error,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("flex w-full justify-between", {
              "border-red-600": !!error,
            })}
          >
            {value
              ? options?.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={popoverClassName} align="start">
          <Command value={value?.toString()}>
            <CommandInput
              placeholder={placeholder}
              className={inputClassname}
            />
            <CommandEmpty>{noOptionsText}</CommandEmpty>
            <CommandGroup>
              {options?.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default Combobox;
