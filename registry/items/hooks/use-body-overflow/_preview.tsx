"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useBodyOverflow } from "./use-body-overflow";

export function Preview() {
  const [isOpen, setIsOpen] = useState(false);

  useBodyOverflow(isOpen);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Button onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "Unlock page scroll" : "Lock page scroll"}
      </Button>
      <p className="text-sm text-muted-foreground">
        {isOpen ? "Body scroll is locked. Try scrolling the page." : "Body scroll is unlocked."}
      </p>
    </div>
  );
}
