/* oxlint-disable vitest/no-standalone-expect -- @fast-check/vitest's test is the test block */

import { test } from "@fast-check/vitest";
import { describe, expect } from "vitest";

import { buttonVariant, buttonVariantProps, iconButtonSize } from "@/test/fast-check";

import { buttonVariants } from "../button.variants";

const iconSizeClass = {
  "icon-sm": "size-8",
  "icon-md": "size-9",
  "icon-lg": "size-10",
} as const;

describe("buttonVariants", () => {
  test.prop([buttonVariantProps])(
    "returns a class string for every variant and size",
    ({ variant, size }) => {
      const classes = buttonVariants({ variant, size });

      expect(classes).toEqual(expect.any(String));
      expect(classes.length).toBeGreaterThan(0);
    },
  );

  test.prop({
    variant: buttonVariant,
    size: iconButtonSize,
  })("icon sizes include the matching size class", ({ variant, size }) => {
    expect(buttonVariants({ variant, size })).toContain(iconSizeClass[size]);
  });
});
