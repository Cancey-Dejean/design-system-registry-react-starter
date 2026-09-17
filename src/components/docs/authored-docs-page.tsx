import type { DocsPageDetail } from "../../lib/docs/detail.server";
import { DocsPageBody } from "./docs-page-body";
import { DocsPageHeader } from "./docs-page-header";

type AuthoredDocsPageProps = {
  page: DocsPageDetail;
};

export function AuthoredDocsPage({ page }: AuthoredDocsPageProps) {
  return (
    <DocsPageBody toc={page.toc}>
      <DocsPageHeader title={page.title} description={page.description} pagePath={page.routePath} />
      {page.content}
    </DocsPageBody>
  );
}
