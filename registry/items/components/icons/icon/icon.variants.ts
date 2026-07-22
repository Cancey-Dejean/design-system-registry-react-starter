import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconBase = cn("");

const iconConfig = {
  variants: {
    size: {
      sm: "size-3",
      md: "size-4",
      lg: "size-6",
    },
  },
  compoundVariants: [],

  defaultVariants: {
    size: "md" as const,
  },
} as const;

export const iconCva = cva(iconBase, {
  ...iconConfig,
  compoundVariants: [...iconConfig.compoundVariants],
});

// Export the size variants
export const ICON_SIZES = Object.keys(
  iconConfig.variants.size,
) as (keyof typeof iconConfig.variants.size)[];

export const iconVariants = iconCva;
