import { AspectRatio } from "./aspect-ratio";

export function Preview() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-md overflow-hidden rounded-lg bg-muted">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Mountain landscape by Drew Beamer"
        className="size-full object-cover dark:brightness-50 dark:grayscale"
      />
    </AspectRatio>
  );
}
