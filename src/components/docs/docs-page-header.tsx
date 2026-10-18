import StorybookLogo from "../../../registry/items/components/logos/logo-set/storybook";
import { getAdjacentSiteNavigation } from "../../lib/navigation";
import { getRegistryStorybookUrl } from "../../lib/registry/storybook-links";
import {
  getCanonicalDocsUrl,
  getCanonicalRegistryItemUrl,
  getDocsMarkdownPath,
} from "../../lib/site-config";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
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
  const storybookUrl = registryItemName ? getRegistryStorybookUrl(registryItemName) : undefined;
  const { current, previous, next } = getAdjacentSiteNavigation(pagePath);

  return (
    <header className={cn("flex max-w-full flex-col gap-2", className)}>
      <div className="flex flex-row flex-wrap items-start justify-between gap-3">
        <h1 className="min-w-0 font-heading text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {registryItemName &&
          (storybookUrl ||
            pagePath.startsWith("/components/") ||
            pagePath.startsWith("/blocks/")) ? (
            <Tooltip>
              {storybookUrl ? (
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      nativeButton={false}
                      render={
                        <a
                          href={storybookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Storybook"
                        />
                      }
                    />
                  }
                >
                  <StorybookLogo data-icon className="size-6" />
                </TooltipTrigger>
              ) : (
                <TooltipTrigger
                  render={<span />}
                  tabIndex={0}
                  aria-label="Storybook Needed"
                  className="inline-flex rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Button variant="ghost" size="icon-xs" disabled aria-label="Storybook Needed">
                    <StorybookLogo data-icon className="size-6" />
                  </Button>
                </TooltipTrigger>
              )}
              <TooltipContent>
                {storybookUrl ? "View Storybook" : "Storybook Needed"}
              </TooltipContent>
            </Tooltip>
          ) : null}
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
