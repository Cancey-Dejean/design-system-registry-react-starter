import { describe, expect, test } from "vitest";

import { createRegistryCatalogItems, createRegistryMetadataItems } from "./catalog-builder";

describe("createRegistryMetadataItems", () => {
  test("requires non-empty files for registry:page items", () => {
    expect(() =>
      createRegistryMetadataItems({
        "registry/items/pages/example/_registry.mdx": `---
name: example-page
type: registry:page
---
`,
      }),
    ).toThrow(/must declare a non-empty "files" array/u);
  });

  test("requires non-empty files for registry:file items", () => {
    expect(() =>
      createRegistryMetadataItems({
        "registry/items/files/example/_registry.mdx": `---
name: example-file
type: registry:file
---
`,
      }),
    ).toThrow(/must declare a non-empty "files" array/u);
  });

  test("allows registry:ui items without an explicit files array (default path)", () => {
    const items = createRegistryMetadataItems({
      "registry/items/components/example/_registry.mdx": `---
name: example-ui
type: registry:ui
---
`,
    });

    expect(items).toHaveLength(1);
    expect(items[0]?.files).toEqual([
      {
        path: "ui/example-ui.tsx",
        target: "@ui/example-ui.tsx",
        type: "registry:ui",
      },
    ]);
  });

  test("derives public install paths from item-relative source paths", () => {
    const items = createRegistryCatalogItems({
      "registry/items/hooks/use-example/_registry.mdx": `---
name: use-example
type: registry:hook
files:
  - path: use-example.ts
    type: registry:hook
---
`,
    });

    expect(items[0]?.files).toEqual([
      {
        path: "hooks/use-example.ts",
        target: "@hooks/use-example.ts",
        type: "registry:hook",
      },
    ]);
    expect(items[0]?.sourceFiles).toMatchObject([
      {
        path: "hooks/use-example.ts",
        sourcePath: "registry/items/hooks/use-example/use-example.ts",
        target: "@hooks/use-example.ts",
        type: "registry:hook",
      },
    ]);
  });

  test("uses nested item-relative paths as source paths", () => {
    const items = createRegistryCatalogItems({
      "registry/items/hooks/use-example/_registry.mdx": `---
name: use-example
type: registry:hook
files:
  - path: hooks/use-example.ts
    type: registry:hook
---
`,
    });

    expect(items[0]?.files).toEqual([
      {
        path: "hooks/use-example.ts",
        target: "@hooks/use-example.ts",
        type: "registry:hook",
      },
    ]);
    expect(items[0]?.sourceFiles[0]?.sourcePath).toBe(
      "registry/items/hooks/use-example/hooks/use-example.ts",
    );
  });

  test("preserves target-based relative file paths because target controls installation", () => {
    const items = createRegistryCatalogItems({
      "registry/items/pages/example/_registry.mdx": `---
name: example-page
type: registry:page
files:
  - path: page.tsx
    type: registry:page
    target: app/example/page.tsx
---
`,
    });

    expect(items[0]?.files).toEqual([
      {
        path: "page.tsx",
        type: "registry:page",
        target: "app/example/page.tsx",
      },
    ]);
    expect(items[0]?.sourceFiles[0]?.sourcePath).toBe("registry/items/pages/example/page.tsx");
  });

  test("preserves nested item-relative paths in public install paths", () => {
    const items = createRegistryCatalogItems({
      "registry/items/components/example/_registry.mdx": `---
name: fixture-icons
type: registry:ui
files:
  - path: index.tsx
    type: registry:ui
  - path: icon-set/cloud.tsx
    type: registry:ui
---
`,
    });

    expect(items[0]?.files).toEqual([
      {
        path: "ui/index.tsx",
        target: "@ui/index.tsx",
        type: "registry:ui",
      },
      {
        path: "ui/icon-set/cloud.tsx",
        target: "@ui/icon-set/cloud.tsx",
        type: "registry:ui",
      },
    ]);
    expect(items[0]?.sourceFiles.map((file) => file.sourcePath)).toEqual([
      "registry/items/components/example/index.tsx",
      "registry/items/components/example/icon-set/cloud.tsx",
    ]);
  });

  test("preserves intermediate directories for nested item-relative file names", () => {
    const items = createRegistryCatalogItems({
      "registry/items/components/example/_registry.mdx": `---
name: fixture-card
type: registry:ui
files:
  - path: src/fixture-card.tsx
    type: registry:ui
---
`,
    });

    expect(items[0]?.files).toEqual([
      {
        path: "ui/src/fixture-card.tsx",
        target: "@ui/src/fixture-card.tsx",
        type: "registry:ui",
      },
    ]);
    expect(items[0]?.sourceFiles[0]?.sourcePath).toBe(
      "registry/items/components/example/src/fixture-card.tsx",
    );
  });

  test("does not normalize unsafe file paths before validation can report them", () => {
    const items = createRegistryCatalogItems({
      "registry/items/components/example/_registry.mdx": `---
name: fixture-card
type: registry:ui
files:
  - path: ../fixture-card.tsx
    type: registry:ui
  - path: /fixture-card.tsx
    type: registry:ui
  - path: ~/fixture-card.tsx
    type: registry:ui
---
`,
    });

    expect(items[0]?.files).toEqual([
      {
        path: "../fixture-card.tsx",
        type: "registry:ui",
      },
      {
        path: "/fixture-card.tsx",
        type: "registry:ui",
      },
      {
        path: "~/fixture-card.tsx",
        type: "registry:ui",
      },
    ]);
  });

  test("preserves authored paths when explicit target placeholders control installation", () => {
    const items = createRegistryCatalogItems({
      "registry/items/components/prompt-input/_registry.mdx": `---
name: prompt-input
type: registry:ui
files:
  - path: prompt-input.tsx
    type: registry:ui
    target: "@ui/ai/prompt-input.tsx"
---
`,
    });

    expect(items[0]?.files).toEqual([
      {
        path: "prompt-input.tsx",
        type: "registry:ui",
        target: "@ui/ai/prompt-input.tsx",
      },
    ]);
    expect(items[0]?.sourceFiles[0]?.sourcePath).toBe(
      "registry/items/components/prompt-input/prompt-input.tsx",
    );
  });
});
