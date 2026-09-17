import { describe, expect, test } from "vitest";

import { parseMdxAst } from "../content/mdx.ts";
import { getDocsToc, getUniqueHeadingId, slugifyHeading } from "./toc.ts";

describe("docs toc", () => {
  test("slugifies headings", () => {
    expect(slugifyHeading("Configure the registry")).toBe("configure-the-registry");
    expect(slugifyHeading("What's new")).toBe("whats-new");
  });

  test("uniques duplicate slugs", () => {
    const usedIds = new Map<string, number>();

    expect(getUniqueHeadingId("Usage", usedIds)).toBe("usage");
    expect(getUniqueHeadingId("Usage", usedIds)).toBe("usage-1");
  });

  test("nests h3s under the preceding h2 and skips h1", () => {
    const root = parseMdxAst({
      label: "Docs page",
      path: "registry/docs/installation.mdx",
      source: `# Installation

Intro.

## Configure the registry

Body.

## Install an item

### npm

npm command.

### pnpm

pnpm command.
`,
    });

    expect(getDocsToc(root)).toEqual([
      {
        id: "configure-the-registry",
        text: "Configure the registry",
        depth: 2,
      },
      {
        id: "install-an-item",
        text: "Install an item",
        depth: 2,
        children: [
          { id: "npm", text: "npm", depth: 3 },
          { id: "pnpm", text: "pnpm", depth: 3 },
        ],
      },
    ]);
  });
});
