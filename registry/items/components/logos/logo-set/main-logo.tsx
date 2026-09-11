import { cn } from "cn";

export default function MainLogo({
  className,
  src = "/images/logo.png",
  alt = "Main Logo",
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img src={src} alt={alt} className={cn("h-4", className)} {...props} />
  );
}
