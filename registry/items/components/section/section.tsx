import { cn } from "@/lib/utils";

import type { SectionProps } from "./section.types";
import { sectionVariants } from "./section.variants";

export default function Section({ padding, className, ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      data-size={padding}
      className={cn(sectionVariants({ padding }), className)}
      {...props}
    />
  );
}
