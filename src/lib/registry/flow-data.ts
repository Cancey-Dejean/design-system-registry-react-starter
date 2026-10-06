import { getDefaultRegistryTitle } from "./item-title.ts";
import type { RegistryItemType } from "./item-types.ts";
import { parseRegistryMdxMetadataDocument } from "./mdx.ts";

export type RegistryFlowRemoteDependency = {
  id: string;
  name: string;
  source: string;
};

export type RegistryFlowVariant = {
  name: string;
  options: string[];
  defaultValue?: string;
};

export type RegistryFlowProp = {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
};

export type RegistryFlowApi = {
  component?: string;
  variants: RegistryFlowVariant[];
  props: RegistryFlowProp[];
};

export type RegistryFlowApiSource = {
  /** Path of the item's `_registry.mdx`, relative to the project root. */
  path: string;
  name: string;
  title: string;
  /** Source file paths, relative to the item directory. */
  files: string[];
};

export type RegistryFlowItem = {
  name: string;
  type: RegistryItemType;
  title: string;
  dependencies: string[];
  localDependencies: string[];
  remoteDependencies: RegistryFlowRemoteDependency[];
  files: string[];
  api: RegistryFlowApi;
};

export function parseRegistryFlowItem(
  path: string,
  metadata: Record<string, unknown>,
  readApi?: (source: RegistryFlowApiSource) => RegistryFlowApi,
): RegistryFlowItem {
  const item = parseRegistryMdxMetadataDocument(path, metadata);
  const title = item.title ?? getDefaultRegistryTitle(item.name);
  const files = item.files ?? [];

  return {
    name: item.name,
    type: item.type,
    title,
    dependencies: item.dependencies ?? [],
    localDependencies: getStringArray(metadata.localRegistryDependencies),
    remoteDependencies: getStringArray(metadata.registryDependencies).map(
      toRemoteRegistryDependency,
    ),
    files: files.map((file) => file.target ?? file.path),
    api: readApi?.({
      path,
      name: item.name,
      title,
      files: files.map((file) => file.path),
    }) ?? { variants: [], props: [] },
  };
}

export function toRemoteRegistryDependency(value: string): RegistryFlowRemoteDependency {
  if (URL.canParse(value)) {
    const url = new URL(value);
    const lastSegment = url.pathname.split("/").findLast(Boolean) ?? value;

    return {
      id: `remote:${value}`,
      name: lastSegment.replace(/\.json$/u, ""),
      source: url.hostname,
    };
  }

  const namespaced = /^(@[^/]+)\/(.+)$/u.exec(value);

  if (namespaced?.[1] && namespaced[2]) {
    return { id: `remote:${value}`, name: namespaced[2], source: namespaced[1] };
  }

  return { id: `remote:${value}`, name: value, source: "shadcn" };
}

function getStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}
