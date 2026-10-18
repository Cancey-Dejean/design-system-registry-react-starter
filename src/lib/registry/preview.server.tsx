import { createCompositeComponent, type AnyCompositeComponent } from "@tanstack/react-start/rsc";
import type * as React from "react";

import { DotCanvas } from "../../../registry/items/lib/dot-canvas/dot-canvas";
import { normalizeGlobFiles } from "../glob";
import { getRegistryItem } from "./catalog";
import type { RegistryItemDetailInput } from "./detail.types";
const registryPreviewModulesByPath = normalizeGlobFiles(
  import.meta.glob<React.ComponentType>("../../../registry/items/**/_preview.tsx", {
    import: "Preview",
  }),
);

/** Preview requests never load usage MDX, source files, or syntax highlighting. */
export async function getRegistryPreviewData({ name }: RegistryItemDetailInput) {
  const item = getRegistryItem(name);
  if (!item) return { item: null };
  return {
    item: {
      name: item.name,
      title: item.title,
      type: item.type,
      preview: item.hasPreview ? await renderRegistryPreview(item.previewSourceFile.path) : null,
    },
  };
}

export async function renderRegistryPreview(path: string): Promise<AnyCompositeComponent | null> {
  const loadPreview = registryPreviewModulesByPath[path];

  if (!loadPreview) {
    return null;
  }

  const Preview = await loadPreview();

  return createCompositeComponent(() => (
    <div
      data-slot="component-preview"
      className="relative isolate grid min-h-72 place-items-center rounded-lg border bg-background p-6"
    >
      <DotCanvas className="rounded-[inherit] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_85%)]" />
      <div
        data-slot="component-preview-stage"
        className="relative z-1 grid min-h-60 w-full place-items-center"
      >
        <Preview />
      </div>
    </div>
  ));
}
