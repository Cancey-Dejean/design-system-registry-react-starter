import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { IconArrowUpRight, IconLayoutGrid, IconLayoutList, IconSearch } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { getBlockGalleryItems } from "@/lib/registry/block-gallery";
import type { RegistryNavigationCatalogItem } from "@/lib/registry/catalog-navigation";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export function BlockGallery({
  items,
  category = "all",
  categoryPage = false,
}: {
  items: readonly RegistryNavigationCatalogItem[];
  category?: string;
  categoryPage?: boolean;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const blocks = getBlockGalleryItems(items);
  const categories = [...new Map(blocks.map((item) => [item.category.id, item.category])).values()];
  const selected = categories.find((item) => item.id === category);
  const visible = blocks.filter(
    (item) =>
      (category === "all" || item.category.id === category) &&
      `${item.title} ${item.name} ${item.category.title} ${item.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  return (
    <section className="flex min-w-0 flex-col gap-6 pb-8" aria-label="Block gallery">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {categoryPage && selected ? `${selected.title} blocks` : "Blocks"}
        </h1>
        <p className="text-base text-muted-foreground">
          Composed templates and larger UI sections.
        </p>
      </header>
      {!categoryPage && (
        <Tabs
          value={category}
          onValueChange={(value) => {
            if (typeof value === "string")
              void navigate({
                to: "/$section",
                params: { section: "blocks" },
                search: { category: value === "all" ? undefined : value },
              });
          }}
        >
          <div className="overflow-x-auto border-b">
            <TabsList
              variant="line"
              className="relative h-auto gap-5 pb-3"
              aria-label="Block categories"
            >
              <TabsTrigger value="all" className="after:hidden">
                All blocks <Badge variant="secondary">{blocks.length}</Badge>
              </TabsTrigger>
              {categories.map((item) => (
                <TabsTrigger key={item.id} value={item.id} className="after:hidden">
                  {item.title}
                  <Badge variant="secondary">
                    {blocks.filter((block) => block.category.id === item.id).length}
                  </Badge>
                </TabsTrigger>
              ))}
              <TabsPrimitive.Indicator className="absolute bottom-0 left-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) bg-foreground transition-[translate,width] duration-250 ease-out motion-reduce:transition-none" />
            </TabsList>
          </div>
        </Tabs>
      )}
      <div className="flex items-center justify-between gap-3">
        <search className="w-full max-w-xs">
          <InputGroup>
            <InputGroupAddon>
              <IconSearch aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              aria-label="Search blocks"
              placeholder="Search blocks…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </InputGroup>
        </search>
        <Tabs
          value={view}
          onValueChange={(value) => {
            if (typeof value === "string") setView(value);
          }}
        >
          <TabsList aria-label="Gallery layout">
            <TabsTrigger value="grid" aria-label="Grid view">
              <IconLayoutGrid aria-hidden="true" />
            </TabsTrigger>
            <TabsTrigger value="list" aria-label="List view">
              <IconLayoutList aria-hidden="true" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <output className="sr-only" aria-live="polite">
        {visible.length} blocks
      </output>
      <ul
        className={cn(
          "grid min-w-0 gap-5",
          view === "grid" ? "sm:grid-cols-2 min-[92.5rem]:grid-cols-3" : "gap-10",
        )}
      >
        {visible.map((item) => (
          <li key={item.name} className="min-w-0">
            <Link
              to="/$section/$name"
              params={{ section: "blocks", name: item.name }}
              aria-label={`View ${item.title}`}
              className={cn(
                "group flex min-w-0 flex-col rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                view === "grid" && "border p-1 transition-colors hover:border-foreground/30",
              )}
            >
              <div
                className={cn(
                  "block-gallery-preview pointer-events-none relative overflow-hidden rounded-lg border bg-muted/20",
                  view === "list" && "order-2",
                )}
                aria-hidden="true"
                inert
              >
                {/* oxlint-disable-next-line react/iframe-missing-sandbox -- Trusted same-origin registry previews use the app runtime and shared theme storage. */}
                <iframe
                  loading="lazy"
                  tabIndex={-1}
                  title={`${item.title} preview`}
                  src={`/block-preview/${item.name}`}
                  className="absolute top-0 left-0 h-[900px] w-[1440px] origin-top-left border-0"
                />
              </div>
              <div
                className={cn(
                  "flex items-center justify-between gap-4",
                  view === "grid" ? "px-3 py-4" : "pb-3",
                )}
              >
                <div className="flex min-w-0 flex-col items-start gap-2">
                  <h2
                    className={cn(
                      "font-semibold tracking-tight",
                      view === "grid" ? "text-lg" : "text-xl",
                    )}
                  >
                    {item.title}
                  </h2>
                  <Badge variant="outline">{item.category.title}</Badge>
                </div>
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:bg-muted"
                  aria-hidden="true"
                >
                  <IconArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">No blocks found</h2>
          <p className="text-sm text-muted-foreground">Try another search or category.</p>
          <Button
            variant="outline"
            onClick={() => {
              setQuery("");
              if (!categoryPage)
                void navigate({
                  to: "/$section",
                  params: { section: "blocks" },
                  search: { category: undefined },
                });
            }}
          >
            Reset filters
          </Button>
        </div>
      )}
    </section>
  );
}
