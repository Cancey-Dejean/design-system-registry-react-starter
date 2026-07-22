"use client";

import { Check, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import ThreePortalsLogo from "./3-portals";
import AlphaWaveLogo from "./alpha-wave";
import AppleLogo from "./apple";
import AppleStore from "./apple-store";
import FacebookLogo from "./facebook";
import GoogleLogo from "./google";
import InstagramLogo from "./instagram";
import LeapYearLogo from "./leap-year";
import Logo from "./logo";
import LogoGrid from "./logo-grid";
import LogoText from "./logo-text";
import MainLogo from "./main-logo";
import PlayStore from "./play-store";
import VoxelLabsLogo from "./voxel-labs";
import XLogo from "./x";

const LOGOS: Record<string, React.ComponentType<{ className?: string }>> = {
  logo: Logo,
  "logo-text": LogoText,
  apple: AppleLogo,
  "main-logo": MainLogo,
  "three-portals": ThreePortalsLogo,
  "alpha-wave": AlphaWaveLogo,
  "leap-year": LeapYearLogo,
  "voxel-labs": VoxelLabsLogo,
  "apple-store": AppleStore,
  "google-play": PlayStore,
  instagram: InstagramLogo,
  "x-logo": XLogo,
  facebook: FacebookLogo,
  google: GoogleLogo,
};

type LogoKey = keyof typeof LOGOS;
const LOGO_LIST = Object.keys(LOGOS);

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function LogoCard({ name }: { name: LogoKey }) {
  const ref = useRef<HTMLDivElement>(null);
  const [feedback, setFeedback] = useState<"copied" | "downloaded" | null>(null);
  const Component = LOGOS[name];
  const isImage = name === "main-logo";

  const handleClick = useCallback(() => {
    const el = ref.current?.querySelector("svg, img");
    if (!el) return;

    if (el instanceof HTMLImageElement) {
      const src = el.currentSrc || el.getAttribute("src");
      if (!src) return;

      void fetch(src)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = src.split("/").pop() ?? "logo.png";
          a.click();
          URL.revokeObjectURL(url);
          setFeedback("downloaded");
          setTimeout(() => setFeedback(null), 1500);
        })
        .catch(() => {
          /* fetch may fail for non-CORS or invalid URLs */
        });
      return;
    }

    const html = el.outerHTML;
    void navigator.clipboard.writeText(html).then(
      () => {
        setFeedback("copied");
        setTimeout(() => setFeedback(null), 1500);
      },
      () => {
        /* clipboard API may not be available in all storybook envs */
      },
    );
  }, []);

  const feedbackLabel = feedback === "copied" ? "Copied" : "Downloaded";

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.97]"
    >
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-primary/95 transition-all duration-200 ${
          feedback ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-1.5 text-primary-foreground">
          <Check className="size-3.5" strokeWidth={2.5} />
          <span className="text-xs font-semibold tracking-wide">{feedbackLabel}</span>
        </div>
      </div>

      <div
        ref={ref}
        className="flex items-center justify-center text-foreground transition-colors duration-200 group-hover:text-primary [&_img]:max-h-8 [&_img]:w-auto [&_svg]:max-h-12 [&_svg]:min-w-auto"
      >
        <Component className="size-full object-contain" />
      </div>

      <span className="w-full truncate text-center text-[11px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
        {name}
      </span>

      <span className="absolute top-2 right-2 text-[9px] font-medium tracking-widest text-muted-foreground uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {isImage ? "Download" : "SVG"}
      </span>
    </button>
  );
}

export function LogoGallery() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 200);

  const filtered = LOGO_LIST.filter((name) =>
    name.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search logos..."
          className="h-11 w-full rounded-xl border border-border bg-background pr-4 pl-10 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {filtered.length} logo{filtered.length !== 1 ? "s" : ""}
          {debouncedQuery && <span className="text-foreground"> matching "{debouncedQuery}"</span>}
        </span>
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
          Click to copy SVG or download image
        </span>
      </div>

      {filtered.length > 0 ? (
        <LogoGrid className="grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {filtered.map((name) => (
            <LogoCard key={name} name={name} />
          ))}
        </LogoGrid>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16">
          <Search className="size-6 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No logos match "{debouncedQuery}"</p>
        </div>
      )}
    </div>
  );
}
