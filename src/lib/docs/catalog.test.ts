import { describe, expect, test } from "vitest";

import {
  docsPages,
  getDocsPage,
  getDocsRoutePathFromSourcePath,
  getSortedDocsPages,
  parseDocsPageSource,
} from "./catalog";

describe("docs catalog", () => {
  test("maps registry docs files to public docs routes", () => {
    expect(getDocsRoutePathFromSourcePath("registry/docs/index.mdx")).toBe("/docs");
    expect(getDocsRoutePathFromSourcePath("registry/docs/getting-started.mdx")).toBe(
      "/docs/getting-started",
    );
    expect(getDocsRoutePathFromSourcePath("registry/docs/_draft.mdx")).toBeNull();
  });

  test("rejects nested docs pages for now", () => {
    expect(() => getDocsRoutePathFromSourcePath("registry/docs/registry/auth.mdx")).toThrow(
      /Nested docs pages are not supported/u,
    );
  });

  test("parses docs frontmatter and content", () => {
    const page = parseDocsPageSource(
      "registry/docs/getting-started.mdx",
      `---
title: Getting Started
description: Start here.
order: 2
group: Guides
---

# Ignored Heading

Use this page first.
`,
    );

    expect(page).toMatchObject({
      slug: "getting-started",
      routePath: "/docs/getting-started",
      title: "Getting Started",
      description: "Start here.",
      order: 2,
      group: "Guides",
      contentSource: "# Ignored Heading\n\nUse this page first.",
      toc: [],
    });
  });

  test("parses a maintainers audience and omits it by default", () => {
    const maintainersPage = parseDocsPageSource(
      "registry/docs/authoring.mdx",
      "---\ntitle: Authoring\naudience: maintainers\n---\n\nBody.\n",
    );
    const consumerPage = parseDocsPageSource(
      "registry/docs/usage.mdx",
      "---\ntitle: Usage\n---\n\nBody.\n",
    );

    expect(maintainersPage?.audience).toBe("maintainers");
    expect(consumerPage).not.toHaveProperty("audience");
  });

  test("rejects unsupported docs audiences", () => {
    expect(() =>
      parseDocsPageSource(
        "registry/docs/authoring.mdx",
        "---\ntitle: Authoring\naudience: everyone\n---\n\nBody.\n",
      ),
    ).toThrow(/unsupported audience "everyone"/u);
  });

  test("marks the registry authoring page for maintainers", () => {
    expect(getDocsPage("registry")?.audience).toBe("maintainers");
    expect(getDocsPage("installation")).not.toHaveProperty("audience");
  });

  test("extracts nested heading toc from markdown body", () => {
    const page = parseDocsPageSource(
      "registry/docs/installation.mdx",
      `---
title: Installation
---

## Configure the registry

Body.

## Install an item

### npm

Install with npm.
`,
    );

    expect(page?.toc).toEqual([
      {
        id: "configure-the-registry",
        text: "Configure the registry",
        depth: 2,
      },
      {
        id: "install-an-item",
        text: "Install an item",
        depth: 2,
        children: [{ id: "npm", text: "npm", depth: 3 }],
      },
    ]);
  });

  test("allows curated callouts but rejects arbitrary MDX components", () => {
    expect(
      parseDocsPageSource(
        "registry/docs/callout.mdx",
        `# Callout

<Callout title="Note">
Use markdown and curated docs components.
</Callout>
`,
      ),
    ).toMatchObject({
      slug: "callout",
      title: "Callout",
    });

    expect(() =>
      parseDocsPageSource(
        "registry/docs/button.mdx",
        `# Button

<Button />
`,
      ),
    ).toThrow(/unsupported MDX component\(s\): Button/u);

    expect(() =>
      parseDocsPageSource(
        "registry/docs/imports.mdx",
        `import { Button } from "@/components/ui/button"

# Imports
`,
      ),
    ).toThrow(/must not contain MDX imports or exports/u);
  });

  test("falls back to headings and path metadata", () => {
    const page = parseDocsPageSource(
      "registry/docs/authentication.mdx",
      `# Authentication

Protect a private registry.
`,
    );

    expect(page).toMatchObject({
      slug: "authentication",
      routePath: "/docs/authentication",
      title: "Authentication",
      description: "",
      order: 0,
    });
  });

  test("orders docs pages by index, order, group, and title", () => {
    const pages = getSortedDocsPages([
      parseDocsPageSource("registry/docs/beta.mdx", "---\norder: 2\n---\n# Beta")!,
      parseDocsPageSource("registry/docs/index.mdx", "# Home")!,
      parseDocsPageSource("registry/docs/alpha.mdx", "---\norder: 1\n---\n# Alpha")!,
    ]);

    expect(pages.map((page) => page.slug)).toEqual(["", "alpha", "beta"]);
  });

  test("loads authored docs without requiring starter slugs", () => {
    const slugs = docsPages.map((page) => page.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(docsPages).toEqual(getSortedDocsPages(docsPages));

    for (const page of docsPages) {
      expect(page.sourcePath).toMatch(/^registry\/docs\/[^_].*\.(?:md|mdx)$/u);
      expect(page.routePath).toBe(getDocsRoutePathFromSourcePath(page.sourcePath));
      expect(page.title.length).toBeGreaterThan(0);
      expect(getDocsPage(page.slug)).toBe(page);
    }
  });
});
