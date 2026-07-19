import { cn } from "@/lib/utils";

import type { HeadingProps } from "./heading.types";
import { headingVariants } from "./heading.variants";

export default function Heading({
  level = 1,
  size,
  weight = "semibold",
  tone = "default",
  className,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;

  return (
    <Tag
      data-slot="heading"
      data-size={level}
      className={cn(headingVariants({ size, weight, tone }), className)}
      {...props}
    />
  );
}
