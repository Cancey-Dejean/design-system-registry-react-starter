import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

export function GalleryPreview({
  name,
  title,
  isComponents,
  stacked,
}: {
  name: string;
  title: string;
  isComponents: boolean;
  stacked: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const node = container.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onReady = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.source === frame.current?.contentWindow &&
        event.data?.type === "registry-preview-ready" &&
        event.data.name === name
      )
        setReady(true);
    };
    window.addEventListener("message", onReady);
    return () => window.removeEventListener("message", onReady);
  }, [name]);
  useEffect(() => {
    if (!shouldLoad || ready) return undefined;
    const timer = window.setTimeout(() => setSlow(true), 12000);
    return () => window.clearTimeout(timer);
  }, [shouldLoad, ready]);
  return (
    <div
      ref={container}
      className={cn(
        "block-gallery-preview pointer-events-none relative overflow-hidden rounded-lg border bg-muted/20",
        isComponents && "component-gallery-preview",
        stacked && "order-2",
      )}
      aria-hidden="true"
      inert
    >
      {!ready && (
        <div
          data-preview-loading
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background p-8"
        >
          <Skeleton className="h-4 w-2/3 motion-reduce:animate-none" />
          <Skeleton className="h-20 w-full max-w-xs motion-reduce:animate-none" />
          <span className="text-xs text-muted-foreground">
            {slow
              ? "Taking longer than usual. You can still open the details."
              : "Loading preview…"}
          </span>
        </div>
      )}
      {shouldLoad && (
        <>
          {/* oxlint-disable-next-line react/iframe-missing-sandbox -- Trusted same-origin previews need the app runtime and shared theme storage. */}
          <iframe
            ref={frame}
            onLoad={() => {
              // SSR may finish before iframe hydration (or browsers may defer it).
              // Only reveal documents containing the marker rendered after RSC decoding.
              const marker = frame.current?.contentDocument?.querySelector(
                "[data-registry-preview-ready]",
              );
              if (marker?.getAttribute("data-registry-preview-ready") === name) setReady(true);
            }}
            tabIndex={-1}
            title={`${title} preview`}
            src={`/${isComponents ? "component-preview" : "block-preview"}/${name}`}
            className="absolute top-0 left-0 h-[900px] w-[1440px] origin-top-left border-0"
          />
        </>
      )}
    </div>
  );
}
