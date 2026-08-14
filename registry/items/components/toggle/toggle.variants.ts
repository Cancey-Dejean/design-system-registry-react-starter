import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleBase = cn(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

const toggleConfig = {
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border border-input bg-transparent hover:bg-muted",
    },
    size: {
      default:
        "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
      lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
} as const;

export const toggleCva = cva(toggleBase, {
  ...toggleConfig,
  compoundVariants: [...toggleConfig.compoundVariants],
});

// Export the variant variants
export const TOGGLE_VARIANTS = Object.keys(
  toggleConfig.variants.variant,
) as (keyof typeof toggleConfig.variants.variant)[];

// Export the size variants
export const TOGGLE_SIZES = Object.keys(
  toggleConfig.variants.size,
) as (keyof typeof toggleConfig.variants.size)[];

export const toggleVariants = toggleCva;
