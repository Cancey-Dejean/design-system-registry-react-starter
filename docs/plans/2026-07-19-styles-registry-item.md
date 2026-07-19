# Styles Registry Item Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish an installable `@design-system-ui/styles` registry item that ships `globals.css` and `theme.css` into consumer `src/styles/`, plus docs for the CLI flow.

**Architecture:** Author a multi-file `registry:file` item under `registry/items/files/styles/` with explicit `target` paths. Copy CSS from the current design-system style sources. Add `registry/docs/styles.mdx` and light cross-links from existing docs.

**Tech Stack:** shadcn registry (`registry:file`), MDX docs, Vite+ / Bun verification scripts.

**Design doc:** `docs/plans/2026-07-19-styles-registry-item-design.md`

**Skill:** `@.claude/skills/shadcn-registry/SKILL.md`

---

### Task 1: Scaffold the styles registry item shell

**Files:**

- Create: `registry/items/files/styles/` (via scaffold)

**Step 1: Scaffold with an initial CSS file target**

Run:

```sh
bun --bun ./scripts/new.ts --type registry:file --name styles --description "Design system globals and theme CSS for consumer apps." --target "src/styles/globals.css" --file-extension css
```

Expected: creates `registry/items/files/styles/_registry.mdx` and `registry/items/files/styles/styles.css` (scaffold default source name).

**Step 2: Commit scaffold**

```bash
git add registry/items/files/styles
git commit -m "$(cat <<'EOF'
chore: scaffold styles registry file item

EOF
)"
```

---

### Task 2: Author multi-file CSS sources and metadata

**Files:**

- Create: `registry/items/files/styles/globals.css`
- Create: `registry/items/files/styles/theme.css`
- Modify: `registry/items/files/styles/_registry.mdx`
- Delete: scaffold leftover `registry/items/files/styles/styles.css` if present

**Step 1: Copy CSS sources**

Copy contents from:

- `src/styles/globals.css` → `registry/items/files/styles/globals.css`
- `src/styles/theme.css` → `registry/items/files/styles/theme.css`

Do not change CSS in this task unless a relative import path must stay valid (`@import "./theme.css"` already matches co-located install).

**Step 2: Replace `_registry.mdx` frontmatter and usage**

Use this content:

````mdx
---
name: styles
type: registry:file
title: Styles
description: Design system globals and theme CSS for consumer apps.
dependencies:
  - tw-animate-css
  - "@fontsource-variable/geist"
  - "@fontsource-variable/geist-mono"
  - "@tailwindcss/typography"
files:
  - path: globals.css
    type: registry:file
    target: src/styles/globals.css
  - path: theme.css
    type: registry:file
    target: src/styles/theme.css
---

Install the design system CSS foundation, then import `globals.css` in your app entry stylesheet or root layout.

```sh
npx shadcn@latest add @design-system-ui/styles
```
````

```tsx
import "@/styles/globals.css";
```

This writes:

- `src/styles/globals.css`
- `src/styles/theme.css`

If those paths already exist, the shadcn CLI may prompt before overwriting.

````

**Step 3: Remove unused scaffold file**

Delete `registry/items/files/styles/styles.css` if the scaffold created it.

**Step 4: Commit**

```bash
git add registry/items/files/styles
git commit -m "$(cat <<'EOF'
feat: publish installable styles globals and theme CSS

EOF
)"
````

---

### Task 3: Add public docs page

**Files:**

- Create: `registry/docs/styles.mdx`
- Modify: `registry/docs/installation.mdx`
- Modify: `registry/docs/index.mdx` (optional one-line pointer)

**Step 1: Create `registry/docs/styles.mdx`**

````mdx
---
title: Styles
description: Install the design system CSS foundation with the shadcn CLI.
order: 2
---

Before components look correct, add the design system style files. This installs both `globals.css` and `theme.css` into `src/styles/`.

## Prerequisites

Your project should already be set up with [shadcn](https://ui.shadcn.com/docs/installation) and Tailwind CSS.

## Install

### npm

```sh
npx shadcn@latest add @design-system-ui/styles
```
````

### pnpm

```sh
pnpm dlx shadcn@latest add @design-system-ui/styles
```

### yarn

```sh
yarn dlx shadcn@latest add @design-system-ui/styles
```

### bun

```sh
bunx --bun shadcn@latest add @design-system-ui/styles
```

## What gets installed

| File          | Destination              |
| ------------- | ------------------------ |
| `globals.css` | `src/styles/globals.css` |
| `theme.css`   | `src/styles/theme.css`   |

The CLI also installs related packages used by the stylesheet (`tw-animate-css`, Geist font packages, and `@tailwindcss/typography`).

If `src/styles/globals.css` or `src/styles/theme.css` already exist, the CLI may ask before overwriting them.

## Import in your app

Import the globals entry once in your root layout or main stylesheet:

```tsx
import "@/styles/globals.css";
```

`globals.css` already imports `./theme.css`, so you do not need a second import for the theme tokens.

## Next steps

Browse [components](/components), [hooks](/utilities), and [blocks](/blocks), then follow each item page install command.

````

**Step 2: Link from installation docs**

In `registry/docs/installation.mdx`, after the opening paragraph, add:

```mdx
Start with [styles](/docs/styles) so your project has the design system CSS foundation before adding components.
````

**Step 3: Mention styles from intro (optional, keep short)**

In `registry/docs/index.mdx`, add one sentence pointing to `/docs/styles` near the install guidance.

**Step 4: Commit**

```bash
git add registry/docs/styles.mdx registry/docs/installation.mdx registry/docs/index.mdx
git commit -m "$(cat <<'EOF'
docs: explain how to install design system styles via CLI

EOF
)"
```

---

### Task 4: Verify registry health and JSON output

**Files:**

- Verify only (no intentional code changes)

**Step 1: Run doctor**

```sh
bun --bun ./scripts/doctor.ts
```

Expected: exit 0 with no errors for the new `styles` item.

**Step 2: Typecheck/lint touched files**

```sh
vp check --fix registry/items/files/styles/_registry.mdx registry/docs/styles.mdx registry/docs/installation.mdx registry/docs/index.mdx
```

Expected: pass.

**Step 3: Confirm registry JSON includes styles**

With `vp dev` running (or after `vp build`), fetch:

```sh
curl -s http://localhost:3000/r/styles.json | head -c 2000
```

Expected JSON includes:

- `"name": "styles"`
- `"type": "registry:file"`
- two `files` entries with targets `src/styles/globals.css` and `src/styles/theme.css`
- `dependencies` array with the declared packages
- non-empty `content` for both CSS files

**Step 4: Build if routes/docs loading needs refresh**

```sh
vp build
```

Expected: build succeeds and docs route for `/docs/styles` is available.

**Step 5: Commit any verification-only fixes if doctor/check required edits**

Only if files changed:

```bash
git add -A
git commit -m "$(cat <<'EOF'
fix: resolve styles registry verification issues

EOF
)"
```

---

### Task 5: Manual CLI smoke check (optional but recommended)

**Step 1: From a throwaway temp directory with an existing shadcn project, or use dry inspection of JSON**

If a local consumer sandbox exists:

```sh
npx shadcn@latest add http://localhost:3000/r/styles.json
```

Expected:

- creates/overwrites `src/styles/globals.css`
- creates/overwrites `src/styles/theme.css`
- installs declared dependencies

If no sandbox is available, treat Task 4 JSON inspection as the verification gate and note the manual CLI check as follow-up.

---

## Done when

- [ ] `registry/items/files/styles/` publishes both CSS files with correct targets
- [ ] `/docs/styles` documents the CLI install path
- [ ] Installation docs link to styles
- [ ] `doctor` + `vp check` pass
- [ ] `/r/styles.json` looks correct
