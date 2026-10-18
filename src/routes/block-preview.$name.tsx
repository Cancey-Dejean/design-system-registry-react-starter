import { createFileRoute, notFound } from "@tanstack/react-router";

import { ComponentPreview } from "@/components/docs/component-preview";
import { PreviewReady } from "@/components/docs/preview-ready";
import { useServerComponentsReady } from "@/hooks/use-server-components-ready";
import { getRegistryPreview } from "@/lib/registry/preview.functions";

export const Route = createFileRoute("/block-preview/$name")({
  loader: async ({ params }) => {
    const { item } = await getRegistryPreview({ data: { name: params.name } });
    if (!item || item.type !== "registry:block") throw notFound();
    return item;
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: BlockPreviewRoute,
});
function BlockPreviewRoute() {
  const item = Route.useLoaderData();
  useServerComponentsReady(item.preview);
  return (
    <>
      <ComponentPreview preview={item.preview ?? null} />
      <PreviewReady name={item.name} />
    </>
  );
}
