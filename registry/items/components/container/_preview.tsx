import { Container } from "./container";

export function Preview() {
  return (
    <Container
      size="thin"
      className="flex items-center justify-center rounded-2xl border border-dashed bg-background p-4"
    >
      Content goes here...
    </Container>
  );
}
