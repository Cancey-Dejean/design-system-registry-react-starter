"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

export function Preview() {
  return (
    <HoverCard>
      <HoverCardTrigger
        href="https://github.com/shadcn"
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        @shadcn
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <p className="font-medium">@shadcn</p>
          <p className="text-sm text-muted-foreground">
            Building open-source UI that works out of the box.
          </p>
          <p className="text-xs text-muted-foreground">Joined December 2021</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
