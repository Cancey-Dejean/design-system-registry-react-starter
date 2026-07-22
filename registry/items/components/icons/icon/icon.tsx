import { cn } from "@/lib/utils";

import { ICONS } from "../index";
import type { IconProps } from "./icon.types";
import { iconVariants } from "./icon.variants";

export default function Icon({ icon, size, className, ...props }: IconProps) {
  const IconComponent = ICONS[icon];

  return <IconComponent className={cn(iconVariants({ size }), className)} {...props} />;
}
