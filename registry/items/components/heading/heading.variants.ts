import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingBase = cn("leading-none! font-semibold tracking-tight");

const headingConfig = {
  variants: {
    level: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    },
    size: {
      xs: "text-xl",
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
      "2xl": "text-6xl",
      "3xl": "sm:text-7xl text-3xl",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      brand: "text-primary",
      danger: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
  },
  compoundVariants: [],

  defaultVariants: {
    level: 1,
    size: "md",
    weight: "semibold",
    tone: "default",
  },
} as const;

export const headingCva = cva(headingBase, {
  ...headingConfig,
  compoundVariants: [...headingConfig.compoundVariants],
});

// Export the level variants
export const HEADING_LEVELS = Object.keys(
  headingConfig.variants.level,
) as unknown as (keyof typeof headingConfig.variants.level)[];

// Export the size variants
export const HEADING_SIZES = Object.keys(
  headingConfig.variants.size,
) as (keyof typeof headingConfig.variants.size)[];

// Export the weight variants
export const HEADING_WEIGHTS = Object.keys(
  headingConfig.variants.weight,
) as (keyof typeof headingConfig.variants.weight)[];

// Export the tone variants
export const HEADING_TONES = Object.keys(
  headingConfig.variants.tone,
) as (keyof typeof headingConfig.variants.tone)[];

export const headingVariants = headingCva;
