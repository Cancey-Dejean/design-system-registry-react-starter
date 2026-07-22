import { cn } from "@/lib/utils";

import type { ContainerProps } from "./container.types";
import { containerVariants } from "./container.variants";

function Container({ size = "base", className, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      data-size={size}
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Container };
