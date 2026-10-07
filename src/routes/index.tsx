import Heading from "@registry/components/heading/heading";
import { Link, createFileRoute } from "@tanstack/react-router";

import { DocsButton } from "@/components/ui/button";

import StorybookLogo from "../../registry/items/components/logos/logo-set/storybook";
import { getSeoHead } from "../lib/seo";
import { siteConfig } from "../lib/site-config";

export const Route = createFileRoute("/")({
  head: () =>
    getSeoHead({
      title: siteConfig.name,
      description: siteConfig.description,
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex h-dvh flex-1 flex-col items-center justify-center px-4 py-24 sm:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        {/*<h1 className="font-mono text-2xl font-bold tracking-tighter sm:text-3xl">
          {siteConfig.name}
        </h1>*/}
        <Heading level="h1" size="3xl" className="shimmer text-foreground">
          {siteConfig.name}
        </Heading>
        <p className="max-w-lg text-base text-muted-foreground">{siteConfig.description}</p>
        <div className="flex items-center gap-3">
          <DocsButton
            size="lg"
            nativeButton={false}
            render={<Link to="/$section" params={{ section: "components" }} />}
          >
            Browse
          </DocsButton>
          <DocsButton
            variant="outline"
            size="lg"
            nativeButton={false}
            render={
              <a
                href={siteConfig.storybookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Storybook"
              />
            }
          >
            <StorybookLogo data-icon="inline-start" className="size-4" />
            Storybook
          </DocsButton>
        </div>
      </div>
    </div>
  );
}
