import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonBase = cn(
  "group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md leading-none font-medium whitespace-nowrap transition",
  "transition-smooth active:not-disabled:scale-95",
  "hover:no-underline",
  "disabled:pointer-events-none disabled:opacity-50",
  "focus-visible:ring-2 focus-visible:ring-(--color-blue-500) focus-visible:ring-offset-2 focus-visible:outline-none",
  "aria-invalid:border-(--destructive) aria-invalid:ring-(--destructive)/20 dark:aria-invalid:ring-(--destructive)/40",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

const buttonConfig = {
  variants: {
    variant: {
      primary:
        "bg-(--primary) dark:bg-(--input)/30 hover:bg-(--primary)/80 dark:hover:bg-(--input)/50",
      secondary: "bg-(--muted) text-(--foreground) hover:bg-(--muted)/80",
      outline: "border border-(--border) bg-(--color-transparent) hover:bg-(--muted)",
      ghost: "hover:bg-(--muted)",
    },
    icon: {
      true: "p-0 rounded-full",
    },
    size: {
      sm: "h-8 px-3 text-(--text-12)",
      md: "h-10 px-4 text-(--text-14)",
      lg: "h-12 px-6 text-(--text-16)",
      // "icon-xs": "size-6",
      "icon-sm": "size-8",
      "icon-md": "size-9",
      "icon-lg": "size-10",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      className: "text-(--color-white)",
    },
  ],

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
} as const;

export const buttonCva = cva(buttonBase, {
  ...buttonConfig,
  compoundVariants: [...buttonConfig.compoundVariants],
});

// Export the variant variants
export const BUTTON_VARIANTS = Object.keys(
  buttonConfig.variants.variant,
) as (keyof typeof buttonConfig.variants.variant)[];

// Export the size variants
export const BUTTON_SIZES = Object.keys(
  buttonConfig.variants.size,
) as (keyof typeof buttonConfig.variants.size)[];

export const buttonVariants = buttonCva;
