import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tabsListBase = cn(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
);

const tabsListConfig = {
  variants: {
    variant: {
      default: "bg-muted",
      line: "gap-1 bg-transparent",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "default",
  },
} as const;

export const tabsListCva = cva(tabsListBase, {
  ...tabsListConfig,
  compoundVariants: [...tabsListConfig.compoundVariants],
});

// Export the variant variants
export const TABS_LIST_VARIANTS = Object.keys(
  tabsListConfig.variants.variant,
) as (keyof typeof tabsListConfig.variants.variant)[];

export const tabsListVariants = tabsListCva;
