import { getDefaultRegistryTitle } from "./item-title.ts";
import type { RegistryItemType } from "./item-types.ts";
import { parseRegistryMdxMetadataDocument } from "./mdx.ts";

export type RegistryFlowRemoteDependency = {
  id: string;
  name: string;
  source: string;
};

export type RegistryFlowItem = {
  name: string;
  type: RegistryItemType;
  title: string;
  dependencies: string[];
  localDependencies: string[];
  remoteDependencies: RegistryFlowRemoteDependency[];
  files: string[];
};

export function parseRegistryFlowItem(
  path: string,
  metadata: Record<string, unknown>,
): RegistryFlowItem {
  const item = parseRegistryMdxMetadataDocument(path, metadata);

  return {
    name: item.name,
    type: item.type,
    title: item.title ?? getDefaultRegistryTitle(item.name),
    dependencies: item.dependencies ?? [],
    localDependencies: getStringArray(metadata.localRegistryDependencies),
    remoteDependencies: getStringArray(metadata.registryDependencies).map(
      toRemoteRegistryDependency,
    ),
    files: (item.files ?? []).map((file) => file.target ?? file.path),
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
