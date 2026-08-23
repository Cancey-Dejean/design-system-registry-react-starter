import type { VariantProps } from "class-variance-authority";

import type { headingCva } from "./heading.variants";

export type HeadingVariantProps = VariantProps<typeof headingCva>;

export type HeadingLevel = NonNullable<HeadingVariantProps["level"]>;
export type HeadingSize = NonNullable<HeadingVariantProps["size"]>;
export type HeadingWeight = NonNullable<HeadingVariantProps["weight"]>;
export type HeadingTone = NonNullable<HeadingVariantProps["tone"]>;

export type HeadingProps = {
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
  tone?: HeadingTone;
} & React.ComponentPropsWithoutRef<"h1">;
