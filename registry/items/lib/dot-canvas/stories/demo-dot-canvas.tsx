import { cn } from "cn";

import { DotCanvas, type DotCanvasSize } from "../dot-canvas";

export function DemoDotCanvas({
  size = 24,
  className,
}: {
  size?: DotCanvasSize;
  className?: string;
}) {
  return (
    <div
      className={cn("relative h-48 w-full max-w-md overflow-hidden rounded-xl border", className)}
    >
      <DotCanvas size={size} />
      <p className="relative z-10 p-6 text-sm text-muted-foreground">
        Content sits above the dots.
      </p>
    </div>
  );
}
