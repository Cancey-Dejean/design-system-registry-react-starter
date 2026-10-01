import { cva } from "class-variance-authority";

const headingBase = "tracking-tight";

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
      "3xl": "text-60 sm:text-72",
      "2xl": "text-48 sm:text-60",
      xl: "text-36 sm:text-48",
      lg: "text-30 sm:text-36",
      md: "text-24 sm:text-30",
      sm: "text-20 sm:text-24",
      xs: "text-18 sm:text-20",
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
