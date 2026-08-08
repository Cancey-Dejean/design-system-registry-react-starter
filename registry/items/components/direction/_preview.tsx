"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { DirectionProvider, useDirection, type TextDirection } from "./direction";

function DirectionReadout() {
  const direction = useDirection();

  return (
    <div
      dir={direction}
      className="w-full max-w-sm rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
    >
      <p className="text-sm font-medium">{direction === "rtl" ? "مرحباً" : "Hello"}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Current direction: <span className="font-mono">{direction}</span>
      </p>
    </div>
  );
}

export function Preview() {
  const [direction, setDirection] = useState<TextDirection>("ltr");

  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setDirection((current) => (current === "ltr" ? "rtl" : "ltr"))}
      >
        Toggle {direction === "ltr" ? "RTL" : "LTR"}
      </Button>
      <DirectionProvider direction={direction}>
        <DirectionReadout />
      </DirectionProvider>
    </div>
  );
}
