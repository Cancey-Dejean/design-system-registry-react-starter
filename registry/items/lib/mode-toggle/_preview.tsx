"use client";

import { ModeToggle } from "./mode-toggle";

export function Preview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <ModeToggle />
      <p className="text-sm text-muted-foreground">Cycles light, dark, and system.</p>
    </div>
  );
}
