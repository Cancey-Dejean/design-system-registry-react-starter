import { cn } from "@/lib/utils";

import { Container } from "../container";

export function DemoContainer({ className, ...props }: React.ComponentProps<typeof Container>) {
  return (
    <Container
      className={cn(
        "flex items-center justify-center rounded-2xl border border-dashed border-(--foreground-muted) bg-background p-4 text-foreground dark:bg-transparent dark:text-white",
        className,
      )}
      {...props}
    >
      Content goes here...
    </Container>
  );
}
