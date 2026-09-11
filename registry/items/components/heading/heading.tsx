import { cn } from "cn";

import type { HeadingProps } from "./heading.types";
import { headingVariants } from "./heading.variants";

export default function Heading({
  level = "h1",
  size,
  weight = "semibold",
  tone = "default",
  className,
  ...props
}: HeadingProps) {
  const Tag = level;

  return (
    <Tag
      data-slot="heading"
      data-size={level}
      className={cn(headingVariants({ size, weight, tone }), className)}
      {...props}
    />
  );
}
