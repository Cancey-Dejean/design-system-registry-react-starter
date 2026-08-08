"use client";

import { ThemeToggle } from "./theme-toggle";

export function Preview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <ThemeToggle />
      <p className="text-sm text-muted-foreground">Pick a brand palette via data-theme.</p>
    </div>
  );
}
