import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/// <reference types="vitest/config" />
import contentCollections from "@content-collections/vite";
import createMdx from "@mdx-js/rollup";
import babel from "@rolldown/plugin-babel";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { playwright } from "@vitest/browser-playwright";
import { nitro } from "nitro/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { defineConfig, type Plugin } from "vite-plus";

import { getPrerenderPages } from "./src/lib/prerender-pages.ts";
import { shouldExcludeFromSitemap } from "./src/lib/seo.ts";
import { siteConfig } from "./src/lib/site-config.ts";
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Nitro adds `development` to the external conditions of server environments,
// but Node resolves the imports inside externalized packages without it. A
// package reached both ways then loads twice: seroval's dev build from Vite and
// its production build through @tanstack/router-core and seroval-plugins. The
// two Stream classes fail `instanceof` and break streamed server function
// results on client-side navigation.
function matchNodeExternalConditions(): Plugin {
  return {
    name: "match-node-external-conditions",
    apply: "serve",
    configEnvironment: {
      order: "post",
      handler(name, config) {
        const conditions = config.resolve?.externalConditions;
        const consumer = config.consumer ?? (name === "client" ? "client" : "server");
        if (consumer === "server" && conditions) {
          config.resolve!.externalConditions = conditions.filter(
            (condition) => condition !== "development",
          );
        }
      },
    },
  };
}

// Vitest only reads the generated collections. Regenerating them on every test
// run rewrites files the dev server watches, and editor test runners that
// restart often turn that into a constant reload loop.
const shouldGenerateContentCollections =
  process.env.VITEST !== "true" ||
  !existsSync(path.join(dirname, ".content-collections/generated/index.js"));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

const config = defineConfig({
  run: {
    tasks: {
      "registry:new": {
        // TODO: fix TTY weirdness -- for now, run `./scripts/new.ts` from the command line directly.
        command: "bun --bun ./scripts/new.ts",
      },
      "registry:doctor": {
        command: "bun --bun ./scripts/doctor.ts",
      },
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    sortImports: {},
    sortTailwindcss: {
      stylesheet: "src/styles/styles.css",
      functions: ["clsx", "cn", "cva", "tw"],
      preserveDuplicates: false,
      preserveWhitespace: false,
    },
    sortPackageJson: true,
    overrides: [
      {
        files: ["**/*.json", "**/*.jsonc"],
        options: {
          trailingComma: "none",
        },
      },
    ],
    ignorePatterns: [
      "**/.nitro/**",
      "**/.output/**",
      "**/.tanstack/**",
      "**/dist/**",
      "**/node_modules/**",
      "registry/items/**/_registry.mdx",
      "src/routeTree.gen.ts",
      "AGENTS.md",
      "README.md",
    ],
  },
  lint: {
    plugins: ["oxc", "eslint", "typescript", "react", "import", "unicorn", "vitest", "jsx-a11y"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    env: {
      builtin: true,
    },
    categories: {
      correctness: "error",
      suspicious: "warn",
      perf: "warn",
    },
    rules: {
      "no-dupe-else-if": "error",
      "no-empty": "error",
      "no-restricted-globals": "error",
      "react/exhaustive-deps": "error",
      "react/rules-of-hooks": "error",
      "typescript/array-type": "error",
      "typescript/consistent-type-exports": "error",
      "typescript/no-floating-promises": "error",
      "typescript/no-misused-promises": "error",
      "typescript/no-namespace": "error",
      "typescript/prefer-for-of": "error",
      "typescript/require-await": "error",
      "unicorn/no-new-buffer": "error",
      "jsx-a11y/anchor-has-content": "off",
      "react/react-in-jsx-scope": "off",
    },
    overrides: [
      {
        files: ["**/*.test.ts", "**/*.test.tsx"],
        rules: {
          "typescript/no-unused-vars": "off",
        },
      },
    ],
    ignorePatterns: [
      "**/.nitro/**",
      "**/.output/**",
      "**/.tanstack/**",
      "**/dist/**",
      "**/node_modules/**",
      "src/routeTree.gen.ts",
    ],
  },
  clearScreen: false,
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // The RSC browser decoder imports React DOM during module initialization.
            // Keep it out of the app entry chunk, using Rolldown's native
            // replacement for Rollup manualChunks.
            {
              name: "react-dom",
              test: /node_modules[\\/]react-dom[\\/]/u,
            },
          ],
        },
      },
    },
  },
  // RSC serialization and the SSR serializer must share one RawStream
  // class, and one seroval instance for streamed server function results.
  // Separate copies otherwise fail `instanceof` checks and 500.
  // see `matchNodeExternalConditions`.
  ssr: {
    external: ["@tanstack/router-core", "seroval", "seroval-plugins"],
  },
  server: {
    watch: {
      ignored: [
        "**/.nitro/**",
        "**/.output/**",
        "**/.tanstack/**",
        "**/dist/**",
        "**/node_modules/**",
      ],
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: [
      // shadcn/schema is compiled against Zod v3 and still calls deepPartial().
      // Keep bare zod imports on the v3 entry even when another dependency
      // hoists Zod v4 to the workspace root. see: https://github.com/shadcn-ui/ui/pull/9311
      {
        find: /^zod$/,
        replacement: "zod/v3",
      },
      // tslib's CJS UMD sets __esModule: true without providing a default
      // export, which breaks Vite 8 / Rolldown's consistent CJS interop.
      // Alias to the native ESM build to avoid the interop entirely.
      {
        find: /^tslib$/,
        replacement: "tslib/tslib.es6.js",
      },
    ],
  },
  plugins: [
    matchNodeExternalConditions(),
    devtools(),
    ...(shouldGenerateContentCollections ? [contentCollections()] : []),
    createMdx({
      include: ["**/registry/docs/*.{md,mdx}", "**/registry/items/**/_registry.mdx"],
      remarkPlugins: [remarkFrontmatter, remarkGfm],
    }),
    tailwindcss(),
    ...(process.env.VITEST === "true"
      ? []
      : [
          tanstackStart({
            rsc: {
              enabled: true,
            },
            pages: getPrerenderPages(),
            prerender: {
              enabled: true,
              autoStaticPathsDiscovery: false,
              crawlLinks: false,
              onSuccess: ({ page }) => {
                if (!shouldExcludeFromSitemap(page.path)) {
                  return undefined;
                }
                return {
                  sitemap: {
                    ...page.sitemap,
                    exclude: true,
                  },
                };
              },
            },
            sitemap: {
              enabled: true,
              host: siteConfig.homepage,
            },
          }),
          rsc(),
        ]),
    viteReact(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    ...(process.env.VITEST === "true" ? [] : [nitro()]),
  ],
  test: {
    projects: [
      {
        extends: true,
        test: {
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/**/*.test.ts", "src/**/*.test.tsx", "registry/items/**/*.test.ts"],
          globals: true,
          // @fast-check/vitest reads Vitest's current suite. Inline it so Vite
          // does not bundle a second copy of vitest.
          server: {
            deps: {
              inline: ["@fast-check/vitest"],
            },
          },
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
export default config;
