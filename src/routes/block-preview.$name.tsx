import { createFileRoute, notFound } from "@tanstack/react-router";

import { ComponentPreview } from "@/components/docs/component-preview";
import { useServerComponentsReady } from "@/hooks/use-server-components-ready";
import { getRegistryItemDetail } from "@/lib/registry/detail.functions";

export const Route = createFileRoute("/block-preview/$name")({
  loader: async ({ params }) => {
    const { item } = await getRegistryItemDetail({ data: { name: params.name } });
    if (!item || item.type !== "registry:block") throw notFound();
    return item;
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: BlockPreviewRoute,
});
function BlockPreviewRoute() {
  const item = Route.useLoaderData();
  useServerComponentsReady(item.preview);
  return <ComponentPreview preview={item.preview ?? null} />;
}
