import { describe, expect, test } from "vitest";

import { getRegistryItemApi } from "./flow-props";

describe("getRegistryItemApi", () => {
  test("reads cva variants with their defaults", () => {
    const api = getRegistryItemApi({
      path: "registry/items/components/container/_registry.mdx",
      name: "container",
      title: "Container",
      files: ["container.tsx", "container.types.ts", "container.variants.ts"],
    });

    expect(api.component).toBe("Container");
    expect(api.variants).toEqual([
      { name: "size", options: ["base", "contained", "thin", "full"], defaultValue: "base" },
    ]);
    expect(api.props).toEqual([]);
  });

  test("keeps own non-variant props and leaves out inherited HTML attributes", () => {
    const api = getRegistryItemApi({
      path: "registry/items/components/button/_registry.mdx",
      name: "button",
      title: "Button",
      files: ["button.tsx", "button.types.ts", "button.variants.ts"],
    });

    expect(api.variants.map((variant) => variant.name)).toEqual(["variant", "size"]);
    expect(api.props.map((prop) => prop.name)).toEqual(["as", "fullWidth", "icon"]);
    expect(api.props.find((prop) => prop.name === "as")?.type).toBe("ElementType");
  });

  test("returns an empty API for items without TypeScript sources", () => {
    expect(
      getRegistryItemApi({
        path: "registry/items/missing/_registry.mdx",
        name: "missing",
        title: "Missing",
        files: ["styles.css"],
      }),
    ).toEqual({ variants: [], props: [] });
  });
});
