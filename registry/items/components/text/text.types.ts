import type { VariantProps } from "class-variance-authority";

import type { textCva } from "./text.variants";

export type TextVariantProps = VariantProps<typeof textCva>;

export type TextProps<T extends React.ElementType> = {
  as?: T;
  align?: TextVariantProps["align"];
  size?: TextVariantProps["size"];
  weight?: TextVariantProps["weight"];
  tone?: TextVariantProps["tone"];
} & Omit<React.ComponentPropsWithoutRef<T>, keyof TextVariantProps>;
