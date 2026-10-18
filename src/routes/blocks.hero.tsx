import { createFileRoute } from "@tanstack/react-router";

import { BlockGallery } from "@/components/docs/block-gallery";
import { DocsLayout } from "@/components/docs/docs-layout";
import { registryNavigationItems } from "@/lib/registry/catalog-navigation";
import { getSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/blocks/hero")({
  head: () =>
    getSeoHead({
      title: "Hero blocks",
      description: "Explore marketing hero blocks.",
      path: "/blocks/hero",
    }),
  component: () => (
    <DocsLayout showFooter={false}>
      <BlockGallery items={registryNavigationItems} category="hero" categoryPage />
    </DocsLayout>
  ),
});
