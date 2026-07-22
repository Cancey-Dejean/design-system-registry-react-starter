import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export default function LogoGrid({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("grid grid-cols-12 gap-4", className)} {...props} />;
}
