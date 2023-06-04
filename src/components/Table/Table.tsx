import React from "react";
import {
  Table as TableComponent,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./Components";
import { Table, flexRender } from "@tanstack/react-table";
import { cn } from "@/utils/cn";

interface TableProps<T> {
  caption?: string;
  table: Table<T>;
  columnsLength: number;
  onRowClick?: (row: T) => void;
}

function Table<T>({ table, columnsLength, onRowClick }: TableProps<T>) {
  return (
    <div className="rounded-md border">
      <TableComponent>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick?.(row.original)}
                className={cn({
                  "cursor-pointer": !!onRowClick,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsLength} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableComponent>
    </div>
  );
}

export default Table;
