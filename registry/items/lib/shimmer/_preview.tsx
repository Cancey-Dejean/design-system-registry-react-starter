import { shimmerClass } from "./shimmer";

export function Preview() {
  return <p className={`${shimmerClass} text-sm text-muted-foreground`}>Generating response…</p>;
}
