import { createFileRoute, notFound } from "@tanstack/react-router";

import { ComponentPreview } from "@/components/docs/component-preview";
import { useServerComponentsReady } from "@/hooks/use-server-components-ready";
import { getRegistryItemDetail } from "@/lib/registry/detail.functions";

export const Route = createFileRoute("/component-preview/$name")({
  loader: async ({ params }) => {
    const { item } = await getRegistryItemDetail({ data: { name: params.name } });
    if (!item || (item.type !== "registry:ui" && item.type !== "registry:component"))
      throw notFound();
    return item;
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: ComponentPreviewRoute,
});
function ComponentPreviewRoute() {
  const item = Route.useLoaderData();
  useServerComponentsReady(item.preview);
  return (
    <div className="flex min-h-[450px] items-center justify-center p-8">
      <div className="flex w-full max-w-xl flex-col items-center">
        <ComponentPreview preview={item.preview ?? null} />
      </div>
    </div>
  );
}
