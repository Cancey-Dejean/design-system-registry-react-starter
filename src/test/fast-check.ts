import { BUTTON_SIZES, BUTTON_VARIANTS } from "@registry/components/button/button.variants";
import { themeTextSizes } from "@registry/lib/utils";
import { boolean, constant, constantFrom, oneof, record, stringMatching } from "fast-check";

/** Browser property tests re-render for every run. Keep this small. */
export const domPropertyRuns = 25;

const textColorClasses = [
  "text-foreground",
  "text-muted-foreground",
  "text-primary-foreground",
  "text-destructive",
  "text-white",
] as const;

const tailwindTextSizeClasses = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-[13px]",
] as const;

const layoutUtilityClasses = ["bg-muted", "font-medium", "px-4", "rounded-md"] as const;

const iconSizes = ["icon-sm", "icon-md", "icon-lg"] as const;

export function constantFromValues<const T extends string>(values: readonly T[]) {
  const [first, ...rest] = values;

  if (first === undefined) {
    throw new Error("An arbitrary needs at least one value.");
  }

  return constantFrom(first, ...rest);
}

export const themeTextSizeClass = constantFromValues(themeTextSizes.map((size) => `text-${size}`));

export const textSizeClass = constantFromValues([
  ...themeTextSizes.map((size) => `text-${size}`),
  ...tailwindTextSizeClasses,
]);

export const textColorClass = constantFromValues(textColorClasses);

export const utilityClass = constantFromValues([
  ...themeTextSizes.map((size) => `text-${size}`),
  ...textColorClasses,
  ...layoutUtilityClasses,
]);

export const buttonVariant = constantFromValues(BUTTON_VARIANTS);

export const buttonVariantProps = record({
  variant: buttonVariant,
  size: constantFromValues(BUTTON_SIZES),
});

export const iconButtonSize = constantFromValues(iconSizes);

/** Single-token labels so Storybook `getByRole` name matching stays exact. */
export const buttonLabel = stringMatching(/^[A-Za-z][A-Za-z0-9]{0,16}$/);

export const buttonRenderCase = oneof(
  record({
    as: constant("button" as const),
    children: buttonLabel,
    disabled: boolean(),
    variant: buttonVariant,
    size: constantFromValues(BUTTON_SIZES),
  }),
  record({
    as: constant("a" as const),
    children: buttonLabel,
    href: constantFrom("/", "/docs", "/components"),
    variant: buttonVariant,
    size: constantFromValues(BUTTON_SIZES),
  }),
);
