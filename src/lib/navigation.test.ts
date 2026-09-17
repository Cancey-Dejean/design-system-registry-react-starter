import { describe, expect, test } from "vitest";

import type { DocsNavigationSection } from "./docs/catalog";
import { createSiteNavigationSections, getAdjacentSiteNavigationItems } from "./navigation";

const fixtureDocsSection = {
  id: "docs",
  title: "Docs",
  basePath: "/docs",
  items: [
    {
      title: "Introduction",
      description: "Start here.",
      slug: "",
      routePath: "/docs",
    },
  ],
} satisfies DocsNavigationSection;

const fixtureRegistryItems = [
  {
    name: "alpha-card",
    title: "Alpha Card",
    description: "A compact card.",
    type: "registry:ui",
  },
  {
    name: "stats-grid",
    title: "Stats Grid",
    description: "A dashboard block.",
    type: "registry:block",
  },
  {
    name: "use-clipboard",
    title: "useClipboard",
    description: "A clipboard hook.",
    type: "registry:hook",
  },
] as const;

describe("site navigation", () => {
  test("shows section-based registry navigation", () => {
    const sections = createSiteNavigationSections({
      docsSection: fixtureDocsSection,
      registryItems: fixtureRegistryItems,
    });

    expect(sections.map((section) => section.id)).toEqual([
      "docs",
      "components",
      "blocks",
      "utilities",
    ]);
    expect(sections.map((section) => section.title)).toEqual([
      "Docs",
      "Components",
      "Blocks",
      "Utilities",
    ]);
  });

  test("uses section URLs for registry item navigation", () => {
    const sections = createSiteNavigationSections({
      docsSection: fixtureDocsSection,
      registryItems: fixtureRegistryItems,
    });
    const sectionItems = sections.flatMap((section) => section.items);

    expect(
      sectionItems.find((item) => item.kind === "registry" && item.name === "alpha-card"),
    ).toMatchObject({
      routePath: "/components/alpha-card",
      sectionId: "components",
    });

    expect(
      sectionItems.find((item) => item.kind === "registry" && item.name === "stats-grid"),
    ).toMatchObject({
      routePath: "/blocks/stats-grid",
      sectionId: "blocks",
    });

    expect(
      sectionItems.find((item) => item.kind === "registry" && item.name === "use-clipboard"),
    ).toMatchObject({
      routePath: "/utilities/use-clipboard",
      sectionId: "utilities",
    });
  });

  test("resolves previous and next pages within the active section", () => {
    const sections = createSiteNavigationSections({
      docsSection: {
        ...fixtureDocsSection,
        items: [
          ...fixtureDocsSection.items,
          {
            title: "Installation",
            description: "Install the registry.",
            slug: "installation",
            routePath: "/docs/installation",
          },
          {
            title: "CLI",
            description: "Use the CLI.",
            slug: "cli",
            routePath: "/docs/cli",
          },
        ],
      },
      registryItems: [
        ...fixtureRegistryItems,
        {
          name: "beta-button",
          title: "Beta Button",
          description: "A button.",
          type: "registry:ui",
        },
      ],
    });

    expect(getAdjacentSiteNavigationItems("/docs", sections)).toMatchObject({
      current: { routePath: "/docs" },
      previous: null,
      next: { routePath: "/docs/installation" },
    });
    expect(getAdjacentSiteNavigationItems("/docs/installation", sections)).toMatchObject({
      previous: { routePath: "/docs" },
      next: { routePath: "/docs/cli" },
    });
    expect(getAdjacentSiteNavigationItems("/docs/cli", sections)).toMatchObject({
      previous: { routePath: "/docs/installation" },
      next: null,
    });
    expect(getAdjacentSiteNavigationItems("/components/alpha-card", sections)).toMatchObject({
      previous: null,
      next: { routePath: "/components/beta-button" },
    });
    expect(getAdjacentSiteNavigationItems("/components", sections)).toEqual({
      current: null,
      previous: null,
      next: null,
    });
  });

  test("does not add registry type groups to navigation items", () => {
    const sections = createSiteNavigationSections({
      docsSection: fixtureDocsSection,
      registryItems: fixtureRegistryItems,
    });
    const registryItems = sections
      .flatMap((section) => section.items)
      .filter((item) => item.kind === "registry");

    expect(registryItems.every((item) => !("group" in item))).toBe(true);
  });
});
