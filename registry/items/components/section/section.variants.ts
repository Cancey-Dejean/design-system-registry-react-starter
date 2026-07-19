import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionBase = cn("mx-auto w-full px-6");

const sectionConfig = {
  variants: {
    padding: {
      base: "py-20 md:py-24",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    padding: "base",
  },
} as const;

export const sectionCva = cva(sectionBase, {
  ...sectionConfig,
  compoundVariants: [...sectionConfig.compoundVariants],
});

// Export the size variants
export const SECTION_PADDINGS = Object.keys(
  sectionConfig.variants.padding,
) as (keyof typeof sectionConfig.variants.padding)[];

export const sectionVariants = sectionCva;
