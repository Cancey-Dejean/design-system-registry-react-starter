import { Check, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ICONS } from "./";
import IconGrid from "./icon-grid";
import Icon from "./icon/icon";
import type { IconKey } from "./icon/icon.types";

const ICON_LIST = Object.keys(ICONS) as IconKey[];

/* ─── Helper: debounce hook ─── */
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/* ─── Icon card with copy-to-clipboard ─── */
function IconCard({ name }: { name: IconKey }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;

    const svgString = svg.outerHTML;

    void navigator.clipboard.writeText(svgString).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
      () => {
        /* clipboard API may not be available in all storybook envs */
      },
    );
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.97]"
    >
      {/* Copied badge */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-primary/95 transition-all duration-200 ${
          copied ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-1.5 text-primary-foreground">
          <Check className="size-3.5" strokeWidth={2.5} />
          <span className="text-xs font-semibold tracking-wide">Copied</span>
        </div>
      </div>

      {/* Icon */}
      <div
        ref={ref}
        className="flex size-10 items-center justify-center text-foreground transition-colors duration-200 group-hover:text-primary"
      >
        <Icon icon={name} size="lg" />
      </div>

      {/* Label */}
      <span className="w-full truncate text-center text-[11px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
        {name}
      </span>

      {/* Hover hint */}
      <span className="absolute top-2 right-2 text-[9px] font-medium tracking-widest text-muted-foreground uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        SVG
      </span>
    </button>
  );
}

export function IconGallery() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 200);

  const filtered = ICON_LIST.filter((name) =>
    name.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons..."
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

      {/* Count */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
          {debouncedQuery && <span className="text-foreground"> matching "{debouncedQuery}"</span>}
        </span>
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
          Click to copy SVG
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <IconGrid className="grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8">
          {filtered.map((name) => (
            <IconCard key={name} name={name} />
          ))}
        </IconGrid>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16">
          <Search className="size-6 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No icons match "{debouncedQuery}"</p>
        </div>
      )}
    </div>
  );
}
