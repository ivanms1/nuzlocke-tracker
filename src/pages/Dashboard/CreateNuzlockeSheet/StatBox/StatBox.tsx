import React from "react";

interface StatBoxProps {
  statName: string;
  statValue: number | string;
}

function StatBox({ statName, statValue }: StatBoxProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs uppercase">{statName}</p>
      <p className="flex justify-center rounded-2xl border border-zinc-400 py-2 text-lg font-medium">
        {statValue}
      </p>
    </div>
  );
}

export default StatBox;
