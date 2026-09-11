import { cn } from "cn";

import { Container } from "../container";

export function DemoContainer({
  className,
  ...props
}: React.ComponentProps<typeof Container>) {
  return (
    <Container
      className={cn(
        "border-foreground-muted bg-background text-foreground flex items-center justify-center rounded-2xl border border-dashed p-4 dark:bg-transparent dark:text-white",
        className,
      )}
      {...props}
    >
      Content goes here...
    </Container>
  );
}
