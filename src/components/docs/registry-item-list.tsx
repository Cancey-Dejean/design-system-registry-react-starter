import { Link } from "@tanstack/react-router";

import type { RegistryRouteItem } from "../../lib/registry/sections";
import { getRegistrySectionIdForType } from "../../lib/registry/sections";
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {catalog.items.map((item) => (
            <Link
              key={item.name}
              to="/$section/$name"
              params={{
                section: getRegistrySectionIdForType(item.type),
                name: item.name,
              }}
              className="flex flex-col gap-1 py-3 transition-colors hover:text-foreground"
            >
              <span className="text-sm font-medium">{item.title}</span>
              <span className="text-sm text-muted-foreground">{item.description}</span>
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
