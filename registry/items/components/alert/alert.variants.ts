import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertBase = cn(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
);

const alertConfig = {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive:
        "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "default",
  },
} as const;

export const alertCva = cva(alertBase, {
  ...alertConfig,
  compoundVariants: [...alertConfig.compoundVariants],
});

// Export the variant variants
export const ALERT_VARIANTS = Object.keys(
  alertConfig.variants.variant,
) as (keyof typeof alertConfig.variants.variant)[];

export const alertVariants = alertCva;
