import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingBase = cn("leading-none tracking-tight");

const headingConfig = {
  variants: {
    level: {
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      h5: "",
      h6: "",
    },
    size: {
      xs: "[font-size:var(--text-18)] sm:[font-size:var(--text-20)]",
      sm: "[font-size:var(--text-20)] sm:[font-size:var(--text-24)]",
      md: "[font-size:var(--text-24)] sm:[font-size:var(--text-30)]",
      lg: "[font-size:var(--text-30)] sm:[font-size:var(--text-36)]",
      xl: "[font-size:var(--text-36)] sm:[font-size:var(--text-48)]",
      "2xl": "[font-size:var(--text-48)] sm:[font-size:var(--text-60)]",
      "3xl": "[font-size:var(--text-60)] sm:[font-size:var(--text-72)]",
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
      danger: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    level: "h1",
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
