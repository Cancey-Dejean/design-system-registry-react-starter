import { cn } from "cn";

import Section from "../section";

export function DemoSection({
  className,
  ...props
}: React.ComponentProps<typeof Section>) {
  return (
    <Section
      className={cn(
        "border-foreground bg-background text-foreground flex items-center justify-center rounded-2xl border border-dashed dark:bg-transparent dark:text-white",
        className,
      )}
      {...props}
    >
      Content goes here...
    </Section>
  );
}
