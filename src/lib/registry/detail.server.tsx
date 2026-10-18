import {
  renderMdxContentModule,
  type MdxContentModule,
} from "@/components/docs/mdx-content.server";

import { normalizeGlobFiles } from "../glob";
import { getRegistryItem } from "./catalog";
import type { RegistryItemDetailInput } from "./detail.types";
import { getRegistryDisplaySource } from "./display-source.server";
import { highlightCodeToHtml } from "./highlight.server";
import { renderRegistryPreview } from "./preview.server";
import {
  getRegistryItemWithSources,
  type RegistryCatalogItemWithSources,
  type RegistryPreviewSourceFileWithSource,
  type RegistrySourceFileWithSource,
} from "./source.server";

type RenderedUsage = Awaited<ReturnType<typeof renderUsage>>;
type RenderedPreview = Awaited<ReturnType<typeof renderRegistryPreview>>;

const registryUsageModules = import.meta.glob<MdxContentModule>(
  "../../../registry/items/**/_registry.mdx",
);
const registryUsageModulesByPath = normalizeGlobFiles(registryUsageModules);

export type HighlightedRegistrySourceFile = RegistrySourceFileWithSource & {
  highlightedHtml: string;
};

export type HighlightedRegistryPreviewSourceFile = RegistryPreviewSourceFileWithSource & {
  highlightedHtml: string;
};

export type RegistryItemDetail = Omit<
  RegistryCatalogItemWithSources,
  "hasUsage" | "previewSourceFile" | "registryMdxFilePath" | "sourceFiles" | "usageSource"
> & {
  preview?: RenderedPreview;
  previewSourceFile: HighlightedRegistryPreviewSourceFile;
  sourceFiles: HighlightedRegistrySourceFile[];
  usage?: RenderedUsage;
};

export async function getRegistryItemDetailData(data: RegistryItemDetailInput) {
  const item = getRegistryItem(data.name);

  if (!item) {
    return {
      name: data.name,
      item: null,
    };
  }

  return {
    name: data.name,
    item: await highlightRegistryItem(getRegistryItemWithSources(item)),
  };
}

async function highlightRegistryItem(
  item: RegistryCatalogItemWithSources,
): Promise<RegistryItemDetail> {
  const { hasPreview, hasUsage, usageSource: _usageSource, ...itemWithoutUsageFlag } = item;
  const [preview, previewSourceFile, sourceFiles, usage] = await Promise.all([
    hasPreview ? renderRegistryPreview(item.previewSourceFile.path) : null,
    highlightPreviewSourceFile(item, item.previewSourceFile),
    Promise.all(item.sourceFiles.map((file) => highlightSourceFile(item, file))),
    renderUsage(item.registryMdxFilePath, hasUsage),
  ]);

  return {
    ...itemWithoutUsageFlag,
    hasPreview,
    ...(preview ? { preview } : {}),
    previewSourceFile,
    sourceFiles,
    ...(usage ? { usage } : {}),
  };
}

async function highlightPreviewSourceFile(
  item: RegistryCatalogItemWithSources,
  file: RegistryPreviewSourceFileWithSource,
): Promise<HighlightedRegistryPreviewSourceFile> {
  const source = getRegistryDisplaySource(item, file);

  return {
    ...file,
    source,
    highlightedHtml: await highlightCodeToHtml(source, "preview.tsx"),
  };
}

async function highlightSourceFile(
  item: RegistryCatalogItemWithSources,
  file: RegistrySourceFileWithSource,
): Promise<HighlightedRegistrySourceFile> {
  const source = getRegistryDisplaySource(item, file);

  return {
    ...file,
    source,
    highlightedHtml: await highlightCodeToHtml(source, file.path),
  };
}

async function renderUsage(path: string, hasUsage: boolean) {
  if (!hasUsage) {
    return null;
  }

  return renderMdxContentModule(registryUsageModulesByPath[path]);
}
