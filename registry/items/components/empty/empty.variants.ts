import { cva } from "class-variance-authority";

import { cn } from "cn"

const emptyMediaBase = cn(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
);

const emptyMediaConfig = {
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "default",
  },
} as const;

export const emptyMediaCva = cva(emptyMediaBase, {
  ...emptyMediaConfig,
  compoundVariants: [...emptyMediaConfig.compoundVariants],
});

// Export the variant variants
export const EMPTY_MEDIA_VARIANTS = Object.keys(
  emptyMediaConfig.variants.variant,
) as (keyof typeof emptyMediaConfig.variants.variant)[];

export const emptyMediaVariants = emptyMediaCva;
