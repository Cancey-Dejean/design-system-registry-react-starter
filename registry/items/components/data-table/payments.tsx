"use client";

import { IconArrowsSort, IconDots } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "../checkbox/checkbox";
import type { DataTableFeatures } from "./data-table-features";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "a1b2c3d4",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "e5f6g7h8",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "i9j0k1l2",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "m3n4o5p6",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "q7r8s9t0",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
  { id: "u1v2w3x4", amount: 450, status: "pending", email: "sara@example.com" },
  { id: "y5z6a7b8", amount: 199, status: "success", email: "noah@example.com" },
  {
    id: "c9d0e1f2",
    amount: 512,
    status: "processing",
    email: "lia@example.com",
  },
  { id: "g3h4i5j6", amount: 88, status: "failed", email: "omar@example.com" },
  { id: "k7l8m9n0", amount: 1020, status: "success", email: "ava@example.com" },
];

const statusVariant: Record<
  Payment["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "outline",
  processing: "secondary",
  success: "default",
  failed: "destructive",
};

const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email
        <IconArrowsSort className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    filterFn: "includesString",
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="size-8 p-0" />}>
            <span className="sr-only">Open menu</span>
            <IconDots className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(payment.id);
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
