import { cn } from "@/utils/cn";
import React from "react";
import { TYPE_BG_CLASS, TYPE_ICON } from "src/const";

interface TypeBoxProps {
  type: string;
  multiplier?: "½" | "¼" | "2" | "4" | "0";
}

const TypeBox = ({ type, multiplier }: TypeBoxProps) => {
  const TypeIcon = TYPE_ICON[type];
  return (
    <div
      className={cn(
        TYPE_BG_CLASS[type],
        "flex items-center justify-center gap-2 rounded-full py-1  capitalize text-black",
        {
          "justify-between px-1": !!multiplier,
        }
      )}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
        <TypeIcon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium">{type}</span>
      {multiplier && (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-medium">
          ×{multiplier}
        </span>
      )}
    </div>
  );
};

export default TypeBox;
