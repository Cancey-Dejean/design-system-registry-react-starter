import { describe, expect, it } from "vitest";

import { getBlockCategory, getBlockGalleryItems } from "./block-gallery";

describe("block gallery", () => {
  it("groups numbered variants without collapsing hyphenated block names", () => {
    expect(getBlockCategory("hero-01")).toEqual({ id: "hero", title: "Hero" });
    expect(getBlockCategory("announcement-bar")).toEqual({
      id: "announcement-bar",
      title: "Announcement Bar",
    });
  });
  it("only includes published blocks and preserves detail destinations", () => {
    const items = getBlockGalleryItems([
      { name: "hero-02", title: "Hero 02", description: "Second hero", type: "registry:block" },
      { name: "button", title: "Button", description: "Button", type: "registry:ui" },
    ]);
    expect(items.map((item) => item.name)).toEqual(["hero-02"]);
    expect(items[0]?.category.id).toBe("hero");
  });
});
