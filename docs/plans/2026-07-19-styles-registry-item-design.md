# Styles Registry Item Design

**Date:** 2026-07-19  
**Status:** Approved

## Problem

Consumers need the design system CSS foundation (`globals.css` and `theme.css`) before installed components look correct. Those files currently live only in the docs app under `src/styles/` and are not installable through the shadcn CLI.

## Goals

- Let users install both style files with one CLI command.
- Land files at `src/styles/globals.css` and `src/styles/theme.css`.
- Document the install flow under `registry/docs/`.
- Install required npm packages referenced by `globals.css`.

## Non-Goals

- Do not publish `styles.css` (docs-shell stylesheet).
- Do not merge into or rewrite a consumer's existing CSS entrypoint.
- Do not auto-wire the consumer app import; docs will instruct users to import `globals.css`.

## Approach

Publish one multi-file `registry:file` item named `styles`.

| Concern           | Decision                                         |
| ----------------- | ------------------------------------------------ |
| Registry type     | `registry:file`                                  |
| Item name         | `styles`                                         |
| Item folder       | `registry/items/files/styles/`                   |
| Published files   | `globals.css`, `theme.css`                       |
| Install targets   | `src/styles/globals.css`, `src/styles/theme.css` |
| Docs page         | `registry/docs/styles.mdx`                       |
| Namespace command | `npx shadcn@latest add @design-system-ui/styles` |

### Why `registry:file`

- Explicit `target` paths are first-class for `registry:file`.
- Multi-file installs already work in this registry (see blocks).
- `registry:style` is metadata/CSS-vars oriented and is a weaker fit for shipping two authored CSS sources.

### Source of truth

Copy current contents from:

- `src/styles/globals.css`
- `src/styles/theme.css`

Keep authored copies under `registry/items/files/styles/` so the registry item is self-contained. The docs app may continue using its own `styles.css` shell stylesheet independently.

### Dependencies

Declare npm dependencies required by `globals.css` imports/plugins:

- `tw-animate-css`
- `@fontsource-variable/geist`
- `@fontsource-variable/geist-mono`
- `@tailwindcss/typography`

Assume Tailwind CSS + shadcn project setup already exist from `shadcn init`. Document that prerequisite.

### Docs

Add `registry/docs/styles.mdx` covering:

1. Prerequisite: initialized shadcn + Tailwind project
2. Install commands for npm / pnpm / yarn / bun
3. Files written and destinations
4. Required app import of `src/styles/globals.css`
5. Overwrite warning if those paths already exist
6. Link from installation/intro docs as needed

## Alternatives considered

1. **Separate `globals` and `theme` items** — more CLI steps; rejected because users always need both.
2. **`registry:style` metadata item** — better for token maps than shipping two CSS files with explicit targets.
3. **Merge into existing CSS** — fragile across frameworks and out of scope.

## Success criteria

- `/r/styles.json` lists both files with `src/styles/...` targets and dependencies.
- `bun --bun ./scripts/doctor.ts` passes after the item is added.
- Docs page at `/docs/styles` explains the CLI install path.
- Manual CLI add installs both files into a consumer project.
