import type * as React from "react";

import { cn } from "@/lib/utils";

function AspectRatio({
  ratio,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  const aspectStyle: React.CSSProperties & { "--ratio": number } = {
    ...style,
    "--ratio": ratio,
  };

  return (
    <div
      data-slot="aspect-ratio"
      style={aspectStyle}
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  );
}

export { AspectRatio };
