# Blocks gallery — Layout A

Standalone design approval artifact. Open `index.html` directly in a modern browser; no install, build, CDN, or React runtime is needed. `styles.css`, `gallery.js`, and `assets/` must remain beside it.

For a local preview from the repository root:

```sh
python3 -m http.server 4174 --directory design-prototypes/blocks-gallery
```

- All blocks: http://localhost:4174/#/blocks
- Hero category: http://localhost:4174/#/blocks/hero

These hash URLs represent the proposed application routes without changing the running app. Search matches names, IDs, categories, and layout descriptions. List view stacks full-width previews vertically, with a title and preview action above each artboard. Category links, grid/list views, sidebar toggle, theme switch, and direct block detail links are interactive. Cards link directly to the existing app at `http://localhost:3002/blocks/<id>` (for example `/blocks/hero-01`). Run the app on port 3002 to use those links. Illustrative variants may not yet exist in the app. When porting, replace the local origin with the destination app origin or use relative `/blocks/<id>` paths. Browser Back returns to the gallery. Escape also closes mobile navigation.

All nine cards are illustrative prototype content, including Hero-01 through Hero-06. Hero-01 follows the existing Hero's split composition, announcement, two CTAs, and product preview using local HTML/CSS artwork. These are not published registry items. Docs navigation is limited to the relevant Blocks destinations. Card previews are deliberately non-interactive.

## Porting

Reuse the semantic shell, gallery in `index.html`. `gallery.js` contains sample data, artboard rendering, filtering, and hash navigation; replace these with the destination framework's data and routing. `source.css` contains Tailwind imports, responsive rules, reusable theme variables, and local miniature artboards. The compiled `styles.css` is committed for direct/offline viewing. Geist and its license are bundled under `assets/`.

To rebuild CSS using this repository's existing Tailwind dependency:

```sh
node design-prototypes/blocks-gallery/build.mjs
```

Default is light mode. Use the header theme button for dark mode. The gallery uses three columns at 1480px+, two above 760px, and one below; the docs sidebar collapses at 760px. Reduced motion preferences disable transitions. React integration, registry changes, install controls, and source-code views await separate visual approval.
