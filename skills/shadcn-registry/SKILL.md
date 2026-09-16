---
name: shadcn-registry
description: Add or adapt installable shadcn registry items in _cn template repos.
---

# Shadcn Registry

Use this skill for installable registry items across all public shadcn registry types, previews, usage docs, and registry dependency metadata. Local `AGENTS.md` and `README.md` override this file.

## Workflow

1. Inspect the local repo instructions first.
2. Put published item source under `registry/items/**`. Do not put installable item source under `src/components/ui`; that folder is only for the docs app shell.
3. For new items, scaffold before editing:

```sh
bun --bun ./scripts/new.ts --type registry:ui --name example-card --description "A compact card component."
```

Use `--target` for `registry:page`, `registry:file`, source-backed custom alias installs such as `@ui/ai/prompt-input.tsx`, and targeted `registry:item` files. Use `--file-extension` for `registry:file` and targeted `registry:item` files. Provide font flags for `registry:font` in noninteractive mode.

## Type Map

| User intent               | Type                 | Folder                              |
| ------------------------- | -------------------- | ----------------------------------- |
| shadcn-style UI component | `registry:ui`        | `registry/items/components/<name>/` |
| non-UI component          | `registry:component` | `registry/items/components/<name>/` |
| composed UI pattern       | `registry:block`     | `registry/items/blocks/<name>/`     |
| React hook                | `registry:hook`      | `registry/items/hooks/<name>/`      |
| helper module             | `registry:lib`       | `registry/items/lib/<name>/`        |
| app page                  | `registry:page`      | `registry/items/pages/<name>/`      |
| explicit target file      | `registry:file`      | `registry/items/files/<name>/`      |
| style metadata            | `registry:style`     | `registry/items/styles/<name>/`     |
| theme metadata            | `registry:theme`     | `registry/items/themes/<name>/`     |
| font metadata             | `registry:font`      | `registry/items/fonts/<name>/`      |
| design system base        | `registry:base`      | `registry/items/bases/<name>/`      |
| universal item            | `registry:item`      | `registry/items/items/<name>/`      |

Use kebab-case folder and file names.

## `_registry.mdx`

Each item uses `_registry.mdx` for YAML frontmatter and optional public MDX Usage. Put interactive previews in sibling `_preview.tsx` files. Never list `_registry.mdx` or `_preview.tsx` in `files`.

Common frontmatter:

```yaml
---
name: example-card
type: registry:ui
title: Example Card
description: A compact card component.
---
```

Dependency fields:

- `registryDependencies`: shadcn primitive names such as `button`, `card`, `badge`, `dialog`, or `input`.
- `localRegistryDependencies`: other local registry item names.
- `files`: required for hooks, libs, blocks, pages, target paths, and multi-file items. Use source paths relative to the item `_registry.mdx` file, for example `path: stats-panel.tsx`; the catalog emits shadcn-facing `files[].target` placeholders automatically for alias-backed item types. One-file `registry:ui` items may omit it only when the published source is `<item-name>.tsx` in the item folder. Metadata-only style, theme, font, base, and universal items may omit it.

Do not add `registry/items/**` prefixes or `sourcePath` frontmatter. The catalog derives the source path from the item folder and authored `files[].path`.

Minimal usage:

````mdx
```tsx
import { ExampleCard } from "@/components/ui/example-card";
```
````

Minimal preview:

```tsx
"use client";

import { ExampleCard } from "./example-card";

export function Preview() {
  return <ExampleCard />;
}
```

Keep previews client-safe: static data, local state, and events are fine; avoid network calls, auth, server functions, env reads, and app-only providers.

Storybook stories are authoring-only. **REQUIRED SUB-SKILL:** Use writing-story-files. Do not add `stories/` to `files`.

## Component Variants

If a component uses `cva` from `class-variance-authority`, put every `cva()` call in a colocated `<name>.variants.ts` file (`.ts`, not `.tsx`). Do not define CVA in the component `.tsx`. Follow `registry/items/components/button/button.variants.ts` and the Component Variants section in `registry/docs/registry.mdx`.

Required shape: `{name}Base` via `cn()`, `{name}Config` with `variants`, `compoundVariants`, and `defaultVariants` plus `as const`, `{name}Cva`, key arrays such as `BUTTON_VARIANTS`, and `{name}Variants = {name}Cva`. Keep multiple CVA helpers for one item in the same variants file. List the file in `_registry.mdx` `files` and add `class-variance-authority` to `dependencies`.

## Adaptation Rules

- Extract only the reusable unit into the scaffolded item folder.
- Replace app data access with props, sample data, or small exported fixtures.
- Remove dependencies on app routing, auth, database clients, analytics, env vars, and server-only helpers unless the item intentionally installs those integrations.
- Preserve visual behavior unless the user asks for a redesign.
- Keep relative imports inside the item folder relative.
- Publish shared helpers as separate `registry:lib` files only when that improves install clarity.

## Verification

- Run `vp check --fix <touched-files>`.
- Run `bun --bun ./scripts/doctor.ts` after registry item changes when Bun is available.
- Update `registry/docs/changelog.mdx` for user-facing changes using the `update-changelog` skill.
- Run focused tests when catalog, JSON, source loading, or docs rendering changed.
- Run `vp build` before handoff when docs, routes, registry JSON, catalog loading, or source loading changed.
