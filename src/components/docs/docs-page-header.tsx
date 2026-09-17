import { getAdjacentSiteNavigation } from "../../lib/navigation";
import {
  getCanonicalDocsUrl,
  getCanonicalRegistryItemUrl,
  getDocsMarkdownPath,
} from "../../lib/site-config";
import { cn } from "../../lib/utils";
import { DocsPageActions } from "./docs-page-actions";
import { DocsPagePager } from "./docs-page-pager";

type DocsPageHeaderProps = {
  title: string;
  description: string;
  pagePath: string;
  registryItemName?: string;
  className?: string;
};

export function DocsPageHeader({
  title,
  description,
  pagePath,
  registryItemName,
  className,
}: DocsPageHeaderProps) {
  const { current, previous, next } = getAdjacentSiteNavigation(pagePath);

  return (
    <header className={cn("flex max-w-full flex-col gap-2", className)}>
      <div className="flex flex-row flex-wrap items-start justify-between gap-3">
        <h1 className="min-w-0 font-heading text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <DocsPageActions
            markdownPath={getDocsMarkdownPath(pagePath)}
            pageDescription={description}
            pageTitle={title}
            pageUrl={getCanonicalDocsUrl(pagePath)}
            registryItemJsonUrl={
              registryItemName ? getCanonicalRegistryItemUrl(registryItemName) : undefined
            }
          />
          {current ? <DocsPagePager previous={previous} next={next} /> : null}
        </div>
      </div>
      <p className="text-base text-muted-foreground">{description}</p>
    </header>
  );
}
