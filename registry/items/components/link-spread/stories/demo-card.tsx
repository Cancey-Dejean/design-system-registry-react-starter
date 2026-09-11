import { cn } from "cn";

import LinkSpread from "../link-spread";

type DemoCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  children?: React.ReactNode;
  link?: React.ComponentProps<"a">;
};

export function DemoCard({
  title,
  description,
  imageSrc,
  imageAlt,
  className,
  link,
  children,
}: DemoCardProps) {
  return (
    <article
      className={cn(
        "border-border bg-card text-card-foreground relative w-full max-w-sm overflow-hidden rounded-xl border shadow-sm",
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="aspect-3/2 w-full object-cover"
      />
      <div className="space-y-1 p-4">
        <h3 className="text-lg leading-none font-semibold tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
      {link && <LinkSpread {...link} />}
    </article>
  );
}
