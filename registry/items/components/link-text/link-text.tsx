import type * as React from "react";

import { cn } from "cn";

import type { LinkProps } from "./link-text.types";
import { linkTextVariants } from "./link-text.variants";

export function LinkText<T extends React.ElementType = "a">({
  as,
  tone,
  underline,
  size,
  external,
  className,
  ...props
}: LinkProps<T>) {
  const Component = (as || "a") as React.ComponentType<Record<string, unknown>>;

  return (
    <Component
      data-slot="link-text"
      className={cn(linkTextVariants({ tone, underline, size }), className)}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...props}
    />
  );
}
