import LinkSpread from "./link-spread";

export function Preview() {
  return (
    <article className="relative w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
      <img
        src="https://dummyimage.com/600x400/ababab/fff"
        alt="Link Spread demo"
        className="aspect-3/2 w-full object-cover"
      />
      <div className="space-y-1 p-4">
        <h3 className="text-lg leading-none font-semibold tracking-tight">Card title</h3>
        <p className="text-sm text-muted-foreground">
          The entire card is clickable via LinkSpread.
        </p>
      </div>
      <LinkSpread href="#" aria-label="View card" />
    </article>
  );
}
