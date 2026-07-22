import { cn } from "@/lib/utils";

export default function NavArrow({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      viewBox="0 0 13 13"
      width="10"
      height="10"
      {...props}
    >
      <path
        d="M1 12L12.5 0.499965"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        // className="vector-effect-non-scaling-stroke"
      />
      <path
        d="M1 0.5H12.5V12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        // className="vector-effect-non-scaling-stroke"
      />
    </svg>
  );
}
