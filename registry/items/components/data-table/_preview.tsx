"use client";

import { DataTable } from "./data-table";
import { columns, payments } from "./payments";

export function Preview() {
  return <DataTable columns={columns} data={payments} initialPageSize={5} />;
}
