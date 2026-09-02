"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useCloseMobileMenuOnResize } from "./use-close-mobile-menu-on-resize";

export function Preview() {
  const [isOpen, setIsOpen] = useState(false);

  useCloseMobileMenuOnResize(() => setIsOpen(false));

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Button onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "Close menu" : "Open menu"}
      </Button>
      <p className="text-sm text-muted-foreground">
        {isOpen ? "Menu is open." : "Menu is closed."} Resize the window to close it automatically.
      </p>
    </div>
  );
}
