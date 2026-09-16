import type { VariantProps } from "class-variance-authority";

import type { headingCva } from "./heading.variants";

export type HeadingVariantProps = VariantProps<typeof headingCva>;

export type HeadingProps = {
  level?: NonNullable<HeadingVariantProps["level"]>;
  size?: HeadingVariantProps["size"];
  weight?: HeadingVariantProps["weight"];
  tone?: HeadingVariantProps["tone"];
} & React.ComponentPropsWithoutRef<"h1">;
