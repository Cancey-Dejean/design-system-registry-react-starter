import { cn } from "cn";

export default function LinkSpread({
  className,
  href,
  newTab,
  ...props
}: React.ComponentProps<"a"> & {
  newTab?: boolean;
}) {
  return (
    <a
      data-slot="link-spread"
      href={href || "#"}
      className={cn(
        "absolute inset-0 z-10",
        href ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
      target={newTab ? "_blank" : "_self"}
      {...props}
    />
  );
}
