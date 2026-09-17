"use client";

import { IconSearch } from "@tabler/icons-react";
import { formatForDisplay, useHotkey, type Hotkey } from "@tanstack/react-hotkeys";
import * as React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "../../lib/utils";
import { useCloseMobileSidebar } from "./docs-sidebar";

const searchHotkey = "Mod+K" satisfies Hotkey;

let searchDialogPanelPromise: Promise<typeof import("./search-dialog-panel")> | undefined;

const LazySearchDialogPanel = React.lazy(async () => {
  const module = await loadSearchDialogPanel();

  return { default: module.SearchDialogPanel };
});

type SearchDialogContextValue = {
  openSearch: () => void;
  preload: () => void;
};

const SearchDialogContext = React.createContext<SearchDialogContextValue | null>(null);

function useSearchDialog() {
  const context = React.useContext(SearchDialogContext);

  if (!context) {
    throw new Error("SearchDialog must be used within SearchDialogProvider.");
  }

  return context;
}

export function SearchDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const closeMobileSidebar = useCloseMobileSidebar();

  const openSearch = React.useCallback(() => {
    closeMobileSidebar();
    setOpen(true);
  }, [closeMobileSidebar]);

  useHotkey(
    searchHotkey,
    () => {
      closeMobileSidebar();
      setOpen((currentOpen) => !currentOpen);
    },
    { requireReset: true },
  );

  const value = React.useMemo<SearchDialogContextValue>(
    () => ({
      openSearch,
      preload: preloadSearchDialogPanel,
    }),
    [openSearch],
  );

  return (
    <SearchDialogContext.Provider value={value}>
      {children}
      {open ? (
        <React.Suspense fallback={null}>
          <LazySearchDialogPanel open={open} onOpenChange={setOpen} />
        </React.Suspense>
      ) : null}
    </SearchDialogContext.Provider>
  );
}

export function SearchDialog({ className }: { className?: string }) {
  const { openSearch, preload } = useSearchDialog();
  const shortcutLabel = formatForDisplay(searchHotkey);

  return (
    <Button
      variant="outline"
      className={cn("w-full justify-between text-muted-foreground", className)}
      onClick={openSearch}
      onFocus={preload}
      onPointerEnter={preload}
      onTouchStart={preload}
    >
      <span className="flex min-w-0 items-center gap-2">
        <IconSearch data-icon="inline-start" />
        <span className="truncate">Search docs</span>
      </span>
      <span
        className="rounded border px-1.5 text-xs text-muted-foreground"
        suppressHydrationWarning
      >
        {shortcutLabel}
      </span>
    </Button>
  );
}

function loadSearchDialogPanel() {
  searchDialogPanelPromise ??= import("./search-dialog-panel");

  return searchDialogPanelPromise;
}

function preloadSearchDialogPanel() {
  void loadSearchDialogPanel();
}
