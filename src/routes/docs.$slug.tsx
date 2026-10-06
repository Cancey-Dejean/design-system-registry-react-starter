import { createFileRoute, notFound } from "@tanstack/react-router";

import { AuthoredDocsPage } from "@/components/docs/authored-docs-page";
import { ContentSkeleton } from "@/components/docs/content-skeleton";
import { DocsLayout } from "@/components/docs/docs-layout";
import { useServerComponentsReady } from "@/hooks/use-server-components-ready";

import { getDocsPageDetail } from "../lib/docs/detail.functions";
import { getSiteNavigationSection } from "../lib/navigation";
import { getMarkdownAlternatePath, getSeoHead, getTechArticleJsonLd } from "../lib/seo";
import { siteConfig } from "../lib/site-config";

export const Route = createFileRoute("/docs/$slug")({
  loader: async ({ params }) => {
    const data = await getDocsPageDetail({ data: { path: params.slug } });
    const { page } = data;

    if (!page) {
      throw notFound();
    }

    return { ...data, page };
  },
  pendingComponent: DocsSlugPendingRoute,
  head: ({ loaderData }) => {
    const page = loaderData?.page;

    if (!page) {
      return getSeoHead({
        title: "Docs",
        description: siteConfig.description,
        path: "/docs",
        markdownPath: getMarkdownAlternatePath("/docs"),
      });
    }

    return getSeoHead({
      title: page.title,
      description: page.description,
      path: page.routePath,
      markdownPath: getMarkdownAlternatePath(page.routePath),
      ogType: "article",
      jsonLd: [
        getTechArticleJsonLd({
          title: page.title,
          description: page.description,
          path: page.routePath,
          section: "Docs",
        }),
      ],
    });
  },
  component: DocsSlugRoute,
});

function DocsSlugPendingRoute() {
  const { slug } = Route.useParams();
  const page = getSiteNavigationSection("docs").items.find(
    (item) => item.kind === "docs" && item.slug === slug,
  );

  return <ContentSkeleton toc={page?.kind === "docs" ? page.hasToc : true} />;
}

function DocsSlugRoute() {
  const { page } = Route.useLoaderData();
  useServerComponentsReady(page.content);

  return (
    <DocsLayout>
      <AuthoredDocsPage page={page} />
    </DocsLayout>
  );
}
