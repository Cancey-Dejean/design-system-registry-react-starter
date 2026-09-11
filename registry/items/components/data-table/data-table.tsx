"use client";

import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/table";
import { features, type DataTableFeatures } from "./data-table-features";

export type { DataTableFeatures };

export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  filterColumnId?: string;
  filterPlaceholder?: string;
  className?: string;
  showToolbar?: boolean;
  showPagination?: boolean;
  showSelectionCount?: boolean;
  showColumnVisibility?: boolean;
  initialPageSize?: number;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  filterColumnId = "email",
  filterPlaceholder = "Filter emails...",
  className,
  showToolbar = true,
  showPagination = true,
  showSelectionCount = true,
  showColumnVisibility = true,
  initialPageSize = 10,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: initialPageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const filterColumn = filterColumnId
    ? table.getColumn(filterColumnId)
    : undefined;
  const hideableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide());
  const filterValue = filterColumn?.getFilterValue();
  const filterInputValue = typeof filterValue === "string" ? filterValue : "";

  return (
    <div className={cn("w-full", className)}>
      {showToolbar ? (
        <div className="flex items-center gap-2 py-4">
          {filterColumn ? (
            <Input
              placeholder={filterPlaceholder}
              value={filterInputValue}
              onChange={(event) =>
                filterColumn.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          ) : null}
          {showColumnVisibility && hideableColumns.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" className="ml-auto" />}
              >
                Columns
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {hideableColumns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination || showSelectionCount ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          {showSelectionCount ? (
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          ) : null}
          {showPagination ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
