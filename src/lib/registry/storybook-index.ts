import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { loadCsf } from "storybook/internal/csf-tools";

import { parseRegistryMdx } from "./mdx";

/** Build-time only: use Storybook's parser so titles, custom IDs and exports stay authoritative. */
export function getStorybookReference(source: string, path: string) {
  const csf = loadCsf(source, { fileName: path, makeTitle: (title) => title ?? path }).parse();
  const story = csf.stories[0];
  return story ? { path, storyId: story.id } : null;
}

export function getStoryRegistryItemName(path: string): Promise<string | undefined> {
  return findRegistryMetadata(dirname(path));
}

async function findRegistryMetadata(directory: string): Promise<string | undefined> {
  if (!directory.startsWith("registry/items/")) return undefined;
  const metadataPath = join(directory, "_registry.mdx");
  let source: string | undefined;
  try {
    source = await readFile(metadataPath, "utf8");
  } catch (error) {
    if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") throw error;
  }
  if (source !== undefined) return parseRegistryMdx(metadataPath, source).registryItem.name;
  return findRegistryMetadata(dirname(directory));
}
