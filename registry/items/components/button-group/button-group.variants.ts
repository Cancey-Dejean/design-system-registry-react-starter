import { cva } from "class-variance-authority";

import { cn } from "cn"

const buttonGroupBase = cn(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
);

const buttonGroupConfig = {
  variants: {
    orientation: {
      horizontal:
        "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
      vertical:
        "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    orientation: "horizontal",
  },
} as const;

export const buttonGroupCva = cva(buttonGroupBase, {
  ...buttonGroupConfig,
  compoundVariants: [...buttonGroupConfig.compoundVariants],
});

// Export the orientation variants
export const BUTTON_GROUP_ORIENTATIONS = Object.keys(
  buttonGroupConfig.variants.orientation,
) as (keyof typeof buttonGroupConfig.variants.orientation)[];

export const buttonGroupVariants = buttonGroupCva;
