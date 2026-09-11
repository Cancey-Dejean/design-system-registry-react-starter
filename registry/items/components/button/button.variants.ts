import { cva } from "class-variance-authority";

import { cn } from "cn"

const buttonBase = cn(
  "group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent leading-none font-medium whitespace-nowrap",
  "transition-smooth active:not-disabled:scale-95",
  "hover:no-underline",
  "disabled:pointer-events-none disabled:opacity-50",
  "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none",
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

const buttonConfig = {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/80",
      outline:
        "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
      ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      destructive:
        "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
    },
    icon: {
      true: "p-0 rounded-full",
    },
    size: {
      sm: "h-8 px-3 [font-size:var(--text-12)]",
      md: "h-9 px-4 [font-size:var(--text-14)]",
      lg: "h-10 px-6 [font-size:var(--text-16)]",
      "icon-sm": "size-8 [&_svg]:size-3.5",
      "icon-md": "size-9 [&_svg]:size-4",
      "icon-lg": "size-10 [&_svg]:size-4.5",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      className: "text-white",
    },

    {
      variant: "destructive",
      className: "text-destructive",
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
