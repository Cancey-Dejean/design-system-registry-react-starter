import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import type { ICONS } from "../index";
import type { iconVariants } from "./icon.variants";

export type IconVariants = VariantProps<typeof iconVariants>;
export type IconKey = keyof typeof ICONS;

export type BaseIconProps = ComponentProps<"svg">;

export type IconProps = BaseIconProps & {
  icon: IconKey;
  size?: IconVariants["size"];
};
