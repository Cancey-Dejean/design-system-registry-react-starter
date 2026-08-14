---
name: update-changelog
description: >-
  Update registry/docs/changelog.mdx after user-facing registry, component,
  docs, or install-path changes. Use when finishing registry work, adding or
  changing published items, documenting breaking changes, or when the user asks
  to update the changelog.
---

# Update Changelog

Keep [`registry/docs/changelog.mdx`](../../registry/docs/changelog.mdx) current whenever shipped work is user-facing for registry consumers or maintainers.

## When To Run

Run this skill **before handoff** after changes that affect:

- New, renamed, or removed registry items
- Published source layout, install `target`s, or package file lists
- Component APIs, variants, defaults, or breaking behavior
- Public docs that change how consumers install or author items
- Migration notes consumers need

Skip for pure internal refactors with no install, API, docs, or behavior impact (for example renaming a private helper inside an unpublished story).

## Workflow

1. Read `registry/docs/changelog.mdx` and note the latest `## vX.Y.Z: …` heading.
2. Summarize **only what landed in this session / PR** from the git diff or known edits. Prefer consumer impact over implementation detail.
3. Choose a version bump:
   - **Major** (`x.0.0`): breaking consumer API or install path changes
   - **Minor** (`x.Y.0`): new items, conventions, or non-breaking enhancements
   - **Patch** (`x.y.Z`): fixes, docs clarifications, small non-breaking tweaks
4. Use today's date from the conversation/user context as `Month D, YYYY` (for example `August 14, 2026`).
5. Edit the changelog:
   - If the latest section is already today's release and still unreleased work for the same bump, **append bullets** there.
   - Otherwise **insert a new section** immediately after the intro blurb and before the previous release:

```mdx
## vX.Y.Z: Month D, YYYY

- Short bullet focused on user or maintainer impact.
- Use **Bold lead-in:** when grouping related bullets.
- Call out **Breaking:** changes explicitly.
```

6. Match existing tone: concise bullets, component names in backticks or plain title case as in prior entries, link to docs pages when helpful (`[Registry](/docs/registry)`).
7. Do not invent unshipped work. Do not rewrite older release sections unless correcting a factual error.

## Bullet Style

Good:

```mdx
- **Component variants:** `cva()` definitions now live in colocated `<name>.variants.ts` files.
- Added `Spinner`, an accessible loading indicator.
- **Breaking:** Removed the `link` button variant. Use `as="a"` instead.
```

Avoid:

- Commit-style noise (`refactor: move files`)
- Exhaustive file lists when a category summary is clearer
- Internal-only tooling notes that do not change published items or docs

## After Editing

- Confirm the new section sits above older versions (newest first).
- No need to run `doctor.ts` for docs-only changelog edits unless other registry files changed in the same handoff.
