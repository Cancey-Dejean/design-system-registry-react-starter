import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import type { LOGOS } from "../index";
import type { logoVariants } from "./logo.variants";

export type LogoVariants = VariantProps<typeof logoVariants>;
export type LogoKey = keyof typeof LOGOS;

export type BaseLogoProps = ComponentProps<"svg"> & ComponentProps<"img">;

export type LogoProps = BaseLogoProps & {
  logo: LogoKey;
  size?: LogoVariants["size"];
};
