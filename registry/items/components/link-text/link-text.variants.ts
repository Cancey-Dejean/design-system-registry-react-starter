import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const linkTextBase = cn(
  "inline-flex items-center gap-1 leading-none! font-medium transition-colors focus-visible:ring-2 focus-visible:ring-(--color-blue-500) focus-visible:ring-offset-2 focus-visible:outline-none",
);

const linkTextConfig = {
  variants: {
    tone: {
      default: "text-(--primary) hover:text-(--primary)/80",
      muted: "text-(--muted-foreground) hover:text-(--foreground)",
      subtle: "text-(--color-neutral-500) hover:text-(--color-neutral-700)",
      danger: "text-(--destructive) hover:text-(--destructive)/80",
    },
    underline: {
      none: "no-underline",
      hover: "no-underline hover:underline",
      always: "underline",
    },
    size: {
      sm: "[font-size:var(--text-14)]",
      md: "[font-size:var(--text-16)]",
      lg: "[font-size:var(--text-24)]",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    tone: "default",
    underline: "hover",
    size: "md",
  },
} as const;

export const linkTextCva = cva(linkTextBase, {
  ...linkTextConfig,
  compoundVariants: [...linkTextConfig.compoundVariants],
});

// Export the size variants
export const LINK_SIZES = Object.keys(
  linkTextConfig.variants.size,
) as (keyof typeof linkTextConfig.variants.size)[];

//  Export the tone variants
export const LINK_TONES = Object.keys(
  linkTextConfig.variants.tone,
) as (keyof typeof linkTextConfig.variants.tone)[];

// Export the underline variants
export const LINK_UNDERLINES = Object.keys(
  linkTextConfig.variants.underline,
) as (keyof typeof linkTextConfig.variants.underline)[];

export const linkTextVariants = linkTextCva;
