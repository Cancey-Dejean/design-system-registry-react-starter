import { Link } from "@tanstack/react-router";

import type { RegistryRouteItem } from "../../lib/registry/sections";
import { getRegistrySectionIdForType } from "../../lib/registry/sections";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DocsPageHeader } from "./docs-page-header";

type RegistryListItem = RegistryRouteItem & {
  title: string;
  description: string;
};

type RegistryItemListProps = {
  catalog: {
    title: string;
    description: string;
    basePath: string;
    items: RegistryListItem[];
  };
};

export function RegistryItemList({ catalog }: RegistryItemListProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      <DocsPageHeader
        title={catalog.title}
        description={catalog.description}
        pagePath={catalog.basePath}
      />

      {catalog.items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {catalog.items.map((item) => (
            <Link
              key={item.name}
              to="/$section/$name"
              params={{
                section: getRegistrySectionIdForType(item.type),
                name: item.name,
              }}
              className="block rounded-xl transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card size="sm" className="h-full transition-colors hover:bg-muted/40">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border p-4 text-sm text-muted-foreground">
          Add items under <code>registry/items</code> to publish the registry.
        </p>
      )}
    </div>
  );
}
