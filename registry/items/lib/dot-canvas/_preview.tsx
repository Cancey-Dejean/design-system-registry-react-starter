import { DotCanvas } from "./dot-canvas";

export function Preview() {
  return (
    <div className="relative h-40 w-full max-w-md overflow-hidden rounded-xl border">
      <DotCanvas />
      <p className="relative z-10 p-6 text-sm text-muted-foreground">
        Content sits above the dots.
      </p>
    </div>
  );
}
