import { cn } from "cn";

/** Grid pitch of the dotted canvas, in pixels. 24 is the page-scale default. */
const PITCH = {
  12: "bg-size-[12px_12px]",
  20: "bg-size-[20px_20px]",
  24: "bg-size-[24px_24px]",
} as const;

export type DotCanvasSize = keyof typeof PITCH;

export const DOT_CANVAS_SIZES = [12, 20, 24] as const satisfies readonly DotCanvasSize[];

/**
 * Dotted design-canvas texture. Decorative overlay — pointer events pass
 * through. Pass `className` for masks, opacity, and placement overrides.
 */
export function DotCanvas({ size = 24, className }: { size?: DotCanvasSize; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)]",
        PITCH[size],
        className,
      )}
    />
  );
}
