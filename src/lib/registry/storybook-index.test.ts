import { describe, expect, it } from "vitest";

import { getStorybookReference, getStoryRegistryItemName } from "./storybook-index";

describe("automatic Storybook references", () => {
  it("associates stories with their nearest registry metadata", async () => {
    expect(
      await getStoryRegistryItemName(
        "registry/items/components/accordion/stories/accordion.stories.tsx",
      ),
    ).toBe("accordion");
    expect(
      await getStoryRegistryItemName("registry/items/blocks/hero/hero-01/stories/hero.stories.tsx"),
    ).toBe("hero-01");
  });
  it("derives a concrete story URL id from CSF metadata and exports", () => {
    expect(
      getStorybookReference(
        'export default { title: "Components/Accordion" }; export const Default = {};',
        "registry/items/components/accordion/stories/accordion.stories.tsx",
      )?.storyId,
    ).toBe("components-accordion--default");
  });
  it("respects custom meta IDs instead of guessing from the registry name", () => {
    expect(
      getStorybookReference(
        'export default { title: "Components/New title", id: "stable-id" }; export const WithIcon = {};',
        "example.stories.tsx",
      )?.storyId,
    ).toBe("stable-id--with-icon");
  });
  it("omits links for a file with no stories", () => {
    expect(
      getStorybookReference('export default { title: "Components/Empty" };', "empty.stories.tsx"),
    ).toBeNull();
  });
});
