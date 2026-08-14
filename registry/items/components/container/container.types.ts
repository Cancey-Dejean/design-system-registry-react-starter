import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import type { containerCva } from "./container.variants";

export type ContainerSizeProps = VariantProps<typeof containerCva>;

export type ContainerProps = {
  size?: ContainerSizeProps["size"];
} & ComponentPropsWithoutRef<"div">;
