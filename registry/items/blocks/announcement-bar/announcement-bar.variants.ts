import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const announcementBarBase = cn("py-4");

const announcementBarConfig = {
  variants: {
    theme: {
      light: "bg-background text-foreground",
      dark: "bg-foreground text-background text-white/80 dark:text-black",
      gray: "bg-gray-500/10 text-foreground",
    },
  },
  compoundVariants: [],

  defaultVariants: {
    theme: "light",
  },
} as const;

export const announcementBarCva = cva(announcementBarBase, {
  ...announcementBarConfig,
  compoundVariants: [...announcementBarConfig.compoundVariants],
});

// Export the theme variants
export const ANNOUNCEMENT_BAR_THEMES = Object.keys(
  announcementBarConfig.variants.theme,
) as (keyof typeof announcementBarConfig.variants.theme)[];

export const announcementBarVariants = announcementBarCva;
