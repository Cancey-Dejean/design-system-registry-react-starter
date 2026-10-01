import { cva } from "class-variance-authority";
import { cn } from "cn";

const textBase = cn("tracking-tight");

const textConfig = {
  variants: {
    size: {
      xs: "text-12 sm:text-14",
      sm: "text-14 sm:text-16",
      md: "text-16 sm:text-18",
      lg: "text-18 sm:text-20",
    },
    weight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      danger: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
    align: {
      left: "",
      center: "text-center",
      right: "text-right",
    },
  },
  compoundVariants: [],

  defaultVariants: {
    size: "md",
    weight: "regular",
    tone: "default",
  },
} as const;

export const textCva = cva(textBase, {
  ...textConfig,
  compoundVariants: [...textConfig.compoundVariants],
});

// Export the level variants
export const TEXT_SIZES = Object.keys(
  textConfig.variants.size,
) as (keyof typeof textConfig.variants.size)[];

// Export the size variants
export const TEXT_ALIGNMENTS = Object.keys(
  textConfig.variants.align,
) as (keyof typeof textConfig.variants.align)[];

// Export the weight variants
export const TEXT_WEIGHTS = Object.keys(
  textConfig.variants.weight,
) as (keyof typeof textConfig.variants.weight)[];

// Export the tone variants
export const TEXT_TONES = Object.keys(
  textConfig.variants.tone,
) as (keyof typeof textConfig.variants.tone)[];

export const textVariants = textCva;
