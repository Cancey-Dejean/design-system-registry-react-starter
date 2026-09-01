---
name: sync-registry-metadata
description: >-
  Keep registry item _registry.mdx and _preview.tsx in sync when published
  source changes. Use when adding, removing, renaming, or refactoring files
  under registry/items/**, when doctor warns about unpublished files, or when
  the user asks to update registry metadata or previews.
---

# Sync Registry Metadata

After changing any installable source under `registry/items/**`, update the item's authoring files so the catalog, docs page, and install JSON stay accurate.

Read [`skills/shadcn-registry/SKILL.md`](../shadcn-registry/SKILL.md) for scaffolding and type conventions. Run this skill **before handoff** on every registry item edit.

## When To Run

Run after changes that touch:

- Published source files (`.tsx`, `.ts`, `.css`, etc.)
- Public API surface (props, variants, exports, icon keys, hook return shape)
- Install layout (new subfolders, renamed files, split modules)
- Package or registry dependencies

Skip when edits are limited to private authoring-only files with no consumer impact (for example, a story file that doctor already ignores).

## Workflow

1. **Find the item root** — the folder containing `_registry.mdx` (for example `registry/items/components/heading/`).
2. **Inventory on-disk source** — list publishable files relative to the item root.
3. **Read `_registry.mdx`** — compare `files`, `dependencies`, `registryDependencies`, `localRegistryDependencies`, `title`, `description`, and usage examples.
4. **Read `_preview.tsx`** — confirm it still renders the item's primary experience.
5. **Apply updates** — follow the checklists below.
6. **Verify** — run `vp check --fix` on touched files and `bun --bun ./scripts/doctor.ts`.
7. **Changelog** — if the change is user-facing, run the `update-changelog` skill.

## Publishable File Rules

Include in `files` (when the item type requires an explicit list):

- Component, hook, lib, block, and page source files consumers install
- Colocated helpers: `*.types.ts`, `*.variants.ts`, `index.tsx`, nested modules like `icon-set/*.tsx`

Never include:

- `_registry.mdx`
- `_preview.tsx`
- `stories/`, `*.stories.tsx`, `*.test.tsx`, `*.test.ts`
- Demo-only files used only in Storybook

One-file `registry:ui` items named `<item-name>.tsx` at the item root may omit `files` when the catalog can infer the path. When in doubt, list files explicitly.

Paths in `files[].path` are **relative to the item folder**, not prefixed with `registry/items/`.

## `_registry.mdx` Checklist

- [ ] **files** — every publishable source file is listed; deleted files are removed; renames are updated
- [ ] **files[].type** — matches the item type (`registry:ui`, `registry:hook`, `registry:block`, etc.)
- [ ] **files[].target** — present for `registry:page`, `registry:file`, and nested alias installs; otherwise follow existing item conventions or let the catalog infer when appropriate
- [ ] **dependencies** — npm packages imported by published files are listed (`class-variance-authority`, `lucide-react`, etc.)
- [ ] **registryDependencies** — shadcn primitive names the item installs alongside (`button`, `dialog`, …)
- [ ] **localRegistryDependencies** — other local registry item `name` values the item depends on
- [ ] **description** — still accurate after API or behavior changes
- [ ] **Usage MDX** — import paths, component names, prop examples, and variant keys match the current API (for example, valid `icon` keys, renamed exports, new required props)

## `_preview.tsx` Checklist

- [ ] Exports a named `Preview` function (required by doctor)
- [ ] Imports from relative paths inside the item folder (`./button`, `./icon/icon`, …)
- [ ] Showcases the default or most representative state after the change
- [ ] Reflects new variants, icons, props, or hook behavior consumers will see on the docs page
- [ ] Adds `"use client"` when the preview uses hooks, browser APIs, or event handlers
- [ ] Stays client-safe: no network calls, auth, server functions, env reads, or app-only providers

Prefer existing patterns: map exported variant arrays in previews (`BUTTON_VARIANTS`, `HEADING_SIZES`) and keep usage snippets in `_registry.mdx` minimal but copy-pasteable.

## Change → Update Map

| Source change                          | `_registry.mdx`                                                             | `_preview.tsx`                               |
| -------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------- |
| Added/removed/renamed publishable file | Update `files`                                                              | Update imports if the preview used that file |
| New npm import in published source     | Add to `dependencies`                                                       | —                                            |
| New local registry import              | Add to `localRegistryDependencies`                                          | —                                            |
| New shadcn primitive import            | Add to `registryDependencies`                                               | —                                            |
| New variant, size, or icon key         | Update usage example                                                        | Show the new option when it is the best demo |
| Renamed export or prop                 | Update usage example                                                        | Update props passed to the preview           |
| New `*.variants.ts` file               | Add to `files`; add `class-variance-authority` to `dependencies` if missing | Show a variant when helpful                  |
| Hook API change                        | Update usage example and description                                        | Demonstrate the new return value or behavior |

## Doctor Signals

Treat these `doctor.ts` findings as action items for this skill:

- `Registry item folder contains source files but no _registry.mdx` — scaffold or add `_registry.mdx`
- `Registry item "<name>" does not publish this source file` — add to `files` or move/delete the stray file
- `references a missing file` — remove stale `files` entry or restore the source file
- `must export a named Preview component` — fix `_preview.tsx`

Warnings about unpublished `stories/` files are expected; do not add stories to `files`.

## Example

Icons item gained `icon-set/search.tsx` and removed older icons:

```yaml
# _registry.mdx — add new entries, remove stale ones
files:
  - path: icon-set/search.tsx
    type: registry:ui
    target: "@components/ui/icons/icon-set/search.tsx"
```

```tsx
// _preview.tsx — use a valid icon key
export function Preview() {
  return <Icon icon="search" size="xl" />;
}
```

```mdx
<!-- _registry.mdx usage — match current API -->

<Icon icon="search" size="md" />
```

## After Editing

```sh
vp check --fix registry/items/<path>/**/*
bun --bun ./scripts/doctor.ts
```

Run `vp build` before handoff when registry JSON, routes, or source loading changed.
