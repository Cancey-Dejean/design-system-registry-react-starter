import { cn } from "@/lib/utils";

import { LOGOS } from "../index";
import type { LogoProps } from "./logo.types";
import { logoVariants } from "./logo.variants";

export default function Logo({ logo, size, className, ...props }: LogoProps) {
  const LogoComponent = LOGOS[logo];

  return <LogoComponent className={cn(logoVariants({ size }), className)} {...props} />;
}
