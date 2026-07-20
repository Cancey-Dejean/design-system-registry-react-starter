import { cn } from "@/lib/utils";

import Section from "../section";

export function DemoSection({ className, ...props }: React.ComponentProps<typeof Section>) {
  return (
    <Section
      className={cn(
        "flex items-center justify-center rounded-2xl border border-dashed border-foreground bg-background text-foreground dark:bg-transparent dark:text-white",
        className,
      )}
      {...props}
    >
      Content goes here...
    </Section>
  );
}
