import type { VariantProps } from "class-variance-authority";

import type { linkTextVariants } from "./link-text.variants";

type LinkTextVariants = VariantProps<typeof linkTextVariants>;

export type LinkProps<T extends React.ElementType> = {
  as?: T;
  external?: boolean;
  className?: string;
} & LinkTextVariants &
  Omit<React.ComponentPropsWithoutRef<T>, keyof LinkTextVariants>;
