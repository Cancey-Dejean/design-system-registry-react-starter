import { cva } from "class-variance-authority";

import { cn } from "cn"

const itemBase = cn(
  "group/item flex w-full flex-wrap items-center rounded-lg border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
);

const itemConfig = {
  variants: {
    variant: {
      default: "border-transparent",
      outline: "border-border",
      muted: "border-transparent bg-muted/50",
    },
    size: {
      default: "gap-2.5 px-3 py-2.5",
      sm: "gap-2.5 px-3 py-2.5",
      xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
} as const;

export const itemCva = cva(itemBase, {
  ...itemConfig,
  compoundVariants: [...itemConfig.compoundVariants],
});

// Export the variant variants
export const ITEM_VARIANTS = Object.keys(
  itemConfig.variants.variant,
) as (keyof typeof itemConfig.variants.variant)[];

// Export the size variants
export const ITEM_SIZES = Object.keys(
  itemConfig.variants.size,
) as (keyof typeof itemConfig.variants.size)[];

export const itemVariants = itemCva;

const itemMediaBase = cn(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
);

const itemMediaConfig = {
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "[&_svg:not([class*='size-'])]:size-4",
      image:
        "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "default",
  },
} as const;

export const itemMediaCva = cva(itemMediaBase, {
  ...itemMediaConfig,
  compoundVariants: [...itemMediaConfig.compoundVariants],
});

// Export the media variant variants
export const ITEM_MEDIA_VARIANTS = Object.keys(
  itemMediaConfig.variants.variant,
) as (keyof typeof itemMediaConfig.variants.variant)[];

export const itemMediaVariants = itemMediaCva;
