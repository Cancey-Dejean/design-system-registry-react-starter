import { cva } from "class-variance-authority";

import { cn } from "cn"

const fieldBase = cn("group/field flex w-full gap-2 data-[invalid=true]:text-destructive");

const fieldConfig = {
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    orientation: "vertical",
  },
} as const;

export const fieldCva = cva(fieldBase, {
  ...fieldConfig,
  compoundVariants: [...fieldConfig.compoundVariants],
});

// Export the orientation variants
export const FIELD_ORIENTATIONS = Object.keys(
  fieldConfig.variants.orientation,
) as (keyof typeof fieldConfig.variants.orientation)[];

export const fieldVariants = fieldCva;
