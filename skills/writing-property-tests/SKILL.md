---
name: writing-property-tests
description: Writes property-based tests with fast-check for registry components, CVA variants, and cn. Use when adding fast-check tests, Vitest test.prop, property tests, or Storybook play-function fuzzing.
---

# Writing Property Tests

Property tests check invariants across generated inputs. Example tests stay for the cases you already know. fast-check covers the combinations you would not write by hand.

`vp test` runs two Vitest projects. Pick the project from what the assertion needs.

| Need                                   | Where                                                        | API                                            |
| -------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| Pure functions and `cva` class strings | Node project, `registry/items/<kind>/<name>/tests/*.test.ts` | `test.prop` from `@fast-check/vitest`          |
| Rendered DOM, roles, or attributes     | `tests/<name>.test.stories.tsx` `play`                       | `assert` and `asyncProperty` from `fast-check` |

Story `play` functions are not Vitest tests. Do not call `test.prop` inside `play`.

Both files for one item live in that item's `tests/` directory. Visual stories stay in `stories/`. Node tests and the Storybook property story import the same arbitraries from `src/test/fast-check.ts`, and those arbitraries read the exported variant key arrays. A new variant key is covered by both runners without editing either test. The node file checks class strings. The story checks the rendered role, tag, and attributes. Do not copy one assertion into the other file.

Import named functions from `fast-check` (`constantFrom`, `assert`, `asyncProperty`). A default `fc` import trips `import/no-named-as-default-member`.

The node Vitest project inlines `@fast-check/vitest` in [`vite.config.ts`](../../vite.config.ts). Leave that inline in place. Without it, Vite bundles a second Vitest and `test` / `test.prop` throw "failed to find the current suite".

Oxlint's Vitest plugin only treats `test` imported from `vitest` as a test block. Start a `test.prop` file with:

```ts
/* oxlint-disable vitest/no-standalone-expect -- @fast-check/vitest's test is the test block */
```

## Shared arbitraries

Put generators in [`src/test/fast-check.ts`](../../src/test/fast-check.ts). Do not put them under `registry/items/`; that tree is published.

- Build enum props with `constantFromValues` from exported variant key arrays (`BUTTON_VARIANTS`, `BUTTON_SIZES`). Do not hardcode the options, and do not fuzz arbitrary class-name strings.
- `domPropertyRuns` is 25. Pass it as `numRuns` for any test that renders. Pure tests keep fast-check's default of 100.
- Labels read with `getByRole` must be a single token (`buttonLabel`). The accessible name collapses whitespace, so a generated string with spaces will not match.

## Node tests

Import `test` from `@fast-check/vitest` and `expect` from `vitest`. Do not import `test` from both.

Copy [`registry/items/lib/tests/utils.test.ts`](../../registry/items/lib/tests/utils.test.ts) for `cn`, and [`registry/items/components/button/tests/button.variants.test.ts`](../../registry/items/components/button/tests/button.variants.test.ts) for variants.

```ts
/* oxlint-disable vitest/no-standalone-expect -- @fast-check/vitest's test is the test block */

import { test } from "@fast-check/vitest";
import { describe, expect } from "vitest";

import { buttonVariantProps } from "@/test/fast-check";

import { buttonVariants } from "./button.variants";

describe("buttonVariants", () => {
  test.prop([buttonVariantProps])("returns a class string", ({ variant, size }) => {
    expect(buttonVariants({ variant, size }).length).toBeGreaterThan(0);
  });
});
```

Assert invariants: both classes survive a merge, the later size wins, the function returns a string, an icon size includes its `size-*` class. Do not snapshot the whole class string.

## Storybook tests

Copy the `Property_ValidPropsRender` story in [`registry/items/components/button/tests/button.test.stories.tsx`](../../registry/items/components/button/tests/button.test.stories.tsx).

- Put it in `tests/<name>.test.stories.tsx`, next to the node test, with title `Components/<PascalName>/Tests`.
- Render each sample with `createRoot` and `flushSync` into a host inside `canvasElement`, then unmount in `finally`.
- Generate only valid props: variant keys, boolean flags, and a real `href` when `as` is `"a"`.
- Assert role, tag name, disabled state, and attributes. Do not assert full `className`.
- Cap the run with `{ numRuns: domPropertyRuns }`.

```ts
import { assert, asyncProperty } from "fast-check";

await assert(
  asyncProperty(buttonRenderCase, async (sample) => {
    flushSync(() => {
      root.render(
        <Button size={sample.size} variant={sample.variant}>
          {sample.children}
        </Button>,
      );
    });
    await expect(within(host).getByRole("button", { name: sample.children }).tagName).toBe(
      "BUTTON",
    );
  }),
  { numRuns: domPropertyRuns },
);
```

Do not list `tests/` or `stories/` in `_registry.mdx` `files`.

## Common Mistakes

| Excuse                                                    | Reality                                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| "Fuzz `className` with `fc.string()`"                     | Invalid classes do not test the component contract. Use exported variant keys.       |
| "`test.prop` inside `play`"                               | `play` is one Storybook function. Call `assert(asyncProperty(...))` there.           |
| "One property test file under `src/` for every component" | Put that item's tests in `registry/items/<kind>/<name>/tests/`.                      |
| "100 DOM renders per story"                               | Use `domPropertyRuns` (25) so the Playwright project stays fast.                     |
| "Put arbitraries next to the component"                   | `src/test/fast-check.ts` stays out of the published registry.                        |
| "Replace the example stories"                             | Keep the fixed `play` stories in `tests/`. Add the property story in that same file. |
| "Put `*.test.ts` next to the component"                   | Tests go in `tests/`, not beside the source file.                                    |
