import type { VariantProps } from "class-variance-authority";

import type { headingCva } from "./heading.variants";

export type HeadingVariantProps = VariantProps<typeof headingCva>;

export type HeadingProps = {
  level?: NonNullable<HeadingVariantProps["level"]>;
  size?: NonNullable<HeadingVariantProps["size"]>;
  weight?: NonNullable<HeadingVariantProps["weight"]>;
  tone?: NonNullable<HeadingVariantProps["tone"]>;
} & React.ComponentPropsWithoutRef<"h1">;
