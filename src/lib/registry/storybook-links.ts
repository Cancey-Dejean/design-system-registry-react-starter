import { allRegistryStorybookItems } from "content-collections";

import { siteConfig } from "../site-config";

export function getRegistryStorybookUrl(name: string): string | undefined {
  const reference = allRegistryStorybookItems
    .filter((entry) => entry.itemName === name)
    .toSorted(
      (a, b) =>
        Number(!a.path.includes("/stories/")) - Number(!b.path.includes("/stories/")) ||
        a.path.localeCompare(b.path),
    )[0];
  if (!reference) return undefined;
  const url = new URL(siteConfig.storybookUrl);
  url.searchParams.set("path", `/story/${reference.storyId}`);
  return url.toString();
}
