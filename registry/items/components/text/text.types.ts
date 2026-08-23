import type { VariantProps } from "class-variance-authority";

import type { textCva } from "./text.variants";
export type TextVariantProps = VariantProps<typeof textCva>;

export type TextAlign = NonNullable<TextVariantProps["align"]>;
export type TextSize = NonNullable<TextVariantProps["size"]>;
export type TextWeight = NonNullable<TextVariantProps["weight"]>;
export type TextTone = NonNullable<TextVariantProps["tone"]>;

export type TextProps<T extends React.ElementType> = {
  as?: T;
  align?: TextAlign;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof TextVariantProps>;
