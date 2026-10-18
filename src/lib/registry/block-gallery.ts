import type { RegistryNavigationCatalogItem } from "./catalog-navigation";
import { getDefaultRegistryTitle } from "./item-title";

export function getBlockCategory(name: string) {
  const id = name.replace(/-\d+$/u, "");
  return { id, title: getDefaultRegistryTitle(id) };
}

export function getBlockGalleryItems(items: readonly RegistryNavigationCatalogItem[]) {
  return items
    .filter((item) => item.type === "registry:block")
    .map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      category: getBlockCategory(item.name),
    }));
}
