"use client";

import { useIsMobile } from "./use-mobile";

export function Preview() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-sm font-medium">{isMobile ? "Mobile viewport" : "Desktop viewport"}</p>
      <p className="text-sm text-muted-foreground">
        Resize below ~1024px (63.999rem) to see the value flip.
      </p>
    </div>
  );
}
