import * as React from "react";

import { cn } from "@/lib/utils";

import type { TextProps } from "./text.types";
import { textVariants } from "./text.variants";

export function Text<T extends React.ElementType = "p">({
  as,
  size,
  weight,
  tone,
  align,
  className,
  ...props
}: TextProps<T>) {
  const Component = (as || "p") as React.ComponentType<Record<string, unknown>>;

  return (
    <Component
      data-slot="text"
      className={cn(textVariants({ size, weight, tone, align }), className)}
      {...props}
    />
  );
}
