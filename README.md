# Design System UI

A [shadcn-compatible registry](https://ui.shadcn.com/docs/registry) of React components, blocks, hooks, and utilities, published from a [TanStack Start](https://tanstack.com/start/latest) docs site. Items install as source you own.

- Docs: [reactdocs.canceydejean.dev](https://reactdocs.canceydejean.dev)
- Storybook: [ds-registry-react-starter-storybook.vercel.app](https://ds-registry-react-starter-storybook.vercel.app)
- Source: [github.com/Cancey-Dejean/design-system-registry-react-starter](https://github.com/Cancey-Dejean/design-system-registry-react-starter)

The catalog is grouped into [components](https://reactdocs.canceydejean.dev/components), [blocks](https://reactdocs.canceydejean.dev/blocks), and [utilities](https://reactdocs.canceydejean.dev/utilities). Public docs cover [installation](https://reactdocs.canceydejean.dev/docs/installation), [styles](https://reactdocs.canceydejean.dev/docs/styles), [theming](https://reactdocs.canceydejean.dev/docs/theming), [registry authoring](https://reactdocs.canceydejean.dev/docs/registry), and the [changelog](https://reactdocs.canceydejean.dev/docs/changelog).

## Install

The consuming project needs [shadcn](https://ui.shadcn.com/docs/installation) and Tailwind CSS. Add this registry to `components.json` once:

```json
{
  "registries": {
    "@design-system-ui": "https://reactdocs.canceydejean.dev/r/{name}.json"
  }
}
```

Install the CSS foundation first, then any catalog item. The docs site switches the same command across npm, pnpm, yarn, bun, Vite+, and Deno.

```bash
npx shadcn@latest add @design-system-ui/styles
npx shadcn@latest add @design-system-ui/button
```

```bash
bunx shadcn add "@design-system-ui/styles"
bunx shadcn add "@design-system-ui/button"
```

`styles` installs `globals.css`, `theme.css`, `theme-secondary.css`, and `theme-tertiary.css` into `src/styles/`. Brand accents are documented on the [theming](https://reactdocs.canceydejean.dev/docs/theming) page.

## Local development

This repo uses [Vite+](https://viteplus.dev/) (`vp`) for the app and [Bun](https://bun.com/) for registry scripts.

```bash
curl -fsSL https://vite.plus | bash
vp install
vp dev
```

Open the localhost URL printed by Vite+. `vp dev` serves the docs site. Storybook runs separately on port 6006:

```bash
bun run storybook
```

`bun run dev` starts the docs site and Storybook together.

| Task | Command |
| --- | --- |
| Check a file | `vp check path/to/file.tsx` |
| Check and fix | `vp check --fix path/to/file.tsx` |
| Test | `vp test` |
| Lint | `bun run lint` |
| Production build | `vp build` |
| Registry doctor | `bun --bun ./scripts/doctor.ts` |

`vp build` emits a Nitro server. `bun run start` runs `.output/server/index.mjs`.

## Repository layout

| Path | What it is |
| --- | --- |
| [`registry/config.ts`](registry/config.ts) | Public name, namespace, homepage, repository, and Storybook URL |
| [`registry/docs/`](registry/docs) | Authored docs. Flat `*.mdx` files render under `/docs` |
| [`registry/items/`](registry/items) | Published registry source, docs, previews, and Storybook stories |
| [`src/`](src) | Docs app shell, routes, and catalog |
| [`src/components/ui/`](src/components/ui) | shadcn components for this docs site only |
| [`skills/`](skills) | Agent skills for authoring in this repo |

Site identity today:

```ts
export const registryConfig = {
  name: "design-system-ui",
  registryName: "design-system-ui",
  namespace: "@design-system-ui",
  description: "A TanStack Start template for publishing a shadcn-compatible registry.",
  homepage: "https://reactdocs.canceydejean.dev",
  repositoryUrl: "https://github.com/Cancey-Dejean/design-system-registry-react-starter",
  storybookUrl: "https://ds-registry-react-starter-storybook.vercel.app",
} as const;
```

`homepage` is the origin for install URLs and registry JSON. Nested docs pages are not supported; keep files directly under `registry/docs/`.

## Author a registry item

Scaffold with Bun. Interactive mode is the usual path; pass flags when an agent or script should not prompt.

```bash
bun --bun ./scripts/new.ts
bun --bun ./scripts/new.ts --type registry:ui --name example-card --description "A compact card component."
```

| Type | Folder |
| --- | --- |
| `registry:ui`, `registry:component` | `registry/items/components/<name>/` |
| `registry:block` | `registry/items/blocks/<name>/` |
| `registry:hook` | `registry/items/hooks/<name>/` |
| `registry:lib` | `registry/items/lib/<name>/` |
| `registry:file` | `registry/items/files/<name>/` |

A component folder looks like this:

```text
registry/items/components/example-card/
  _registry.mdx
  _preview.tsx
  example-card.tsx
```

`_registry.mdx` holds public metadata and the Usage section. `_preview.tsx` is the interactive preview on the docs page. Neither file is published. One-file `registry:ui` items can omit `files` and let the catalog infer the source. Hooks, libs, blocks, pages, custom targets, and multi-file items should list `files` with paths relative to `_registry.mdx`. Use `localRegistryDependencies` for other items in this registry.

If a component uses `cva` from `class-variance-authority`, put that definition in a colocated `<name>.variants.ts` file. [`button`](registry/items/components/button) is the reference.

Storybook stories live next to the item (`*.stories.tsx`) and are authoring-only. Follow [`registry/items/components/container/stories/`](registry/items/components/container/stories).

After changing published source under `registry/items/**`:

1. Sync `_registry.mdx` and `_preview.tsx`.
2. Run `bun --bun ./scripts/doctor.ts`.
3. Run `vp check --fix` on the files you touched.
4. Update [`registry/docs/changelog.mdx`](registry/docs/changelog.mdx) when the change is user-facing.

The full authoring guide is [`registry/docs/registry.mdx`](registry/docs/registry.mdx).

## Public routes

- `/registry.json` and `/r/registry.json` serve the registry index.
- `/r/<name>.json` serves an item.
- `/registry`, `/components`, `/blocks`, and `/utilities` are the human-readable catalog. Section item pages look like `/components/button`.
- `/llms.txt` and `/llms-full.txt` are generated from the same Markdown as the site. Each docs and item page also has a `.md` route, such as `/docs/installation.md` and `/components/button.md`.

CLI requests with `Accept: application/vnd.shadcn.v1+json` receive registry JSON from the same URL as the docs page. Requests that prefer `text/markdown`, `text/x-markdown`, or `text/plain` receive Markdown. Browsers still receive HTML.

Authored registry metadata is validated against the [shadcn registry schema](https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/registry/schema.ts).

## Agent skills

Skills in [`skills/`](skills) are the source for work in this repo. Harness copies also live under `.agents/skills/` and `.claude/skills/`.

| Skill | Use it for |
| --- | --- |
| `shadcn-registry` | Adding or adapting installable registry items |
| `writing-story-files` | Storybook stories for registry items |
| `sync-registry-metadata` | Keeping `_registry.mdx` and `_preview.tsx` in sync with published source |
| `update-changelog` | User-facing notes in `registry/docs/changelog.mdx` |
| `safari-mcp` | Verifying the docs site in Safari |

Install one into another harness with the [Skills CLI](https://skills.sh/):

```bash
npx skills add Cancey-Dejean/design-system-registry-react-starter --skill shadcn-registry
```

## Linting

[Oxlint](https://oxc.rs/docs/guide/usage/linter) runs with the [`@shadcn/lint`](https://github.com/shadcn-ui/lint) plugin. The plugin is registered in [`.oxlintrc.json`](.oxlintrc.json) and no rules are enabled yet.

```bash
bun run lint
```

| Rule | What it catches |
| --- | --- |
| `shadcn/no-restyle` | Restyling a component with `className` |
| `shadcn/no-raw-colors` | Raw colors such as `bg-pink-500` |
| `shadcn/no-arbitrary-values` | Arbitrary values such as `p-[13px]` |
| `shadcn/no-inline-styles` | Inline styles and `<style>` elements |
| `shadcn/no-unknown-classes` | Classes Tailwind cannot generate |
| `shadcn/require-static-classes` | Dynamic class expressions the linter cannot read |

```json
{
  "jsPlugins": ["@shadcn/lint"],
  "rules": {
    "shadcn/no-restyle": ["error", { "allow": ["layout"] }]
  }
}
```

Rule options are in the [`@shadcn/lint` docs](https://github.com/shadcn-ui/lint/blob/main/README.md#rules).

## Notes

[`components.json`](components.json) styles this docs app (`base-nova`, Tabler icons). That configuration does not change what consumers receive when they install a registry item.

## License

[MIT](LICENSE)
