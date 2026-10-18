import { describe, expect, it, vi } from "vitest";

const { lookup } = vi.hoisted(() => ({ lookup: vi.fn<(...args: unknown[]) => unknown>() }));
vi.mock("./catalog", () => ({ getRegistryItem: lookup }));
vi.mock("./highlight.server", () => {
  throw new Error("Preview requests must not load the syntax highlighter");
});
vi.mock("./source.server", () => {
  throw new Error("Preview requests must not read published source files");
});
import { getRegistryPreviewData } from "./preview.server";

describe("lightweight registry previews", () => {
  it("returns only preview metadata, without loading source or usage processing", async () => {
    lookup.mockReturnValue({
      name: "sample",
      title: "Sample",
      type: "registry:ui",
      hasPreview: false,
      sourceFiles: ["large.tsx"],
      usageSource: "expensive docs",
    });
    expect(await getRegistryPreviewData({ name: "sample" })).toEqual({
      item: { name: "sample", title: "Sample", type: "registry:ui", preview: null },
    });
  });
  it("returns a missing item without attempting to render a preview", async () => {
    lookup.mockReturnValue(undefined);
    expect(await getRegistryPreviewData({ name: "missing" })).toEqual({ item: null });
  });
  it("returns a null preview when a preview module is absent", async () => {
    lookup.mockReturnValue({
      name: "sample",
      title: "Sample",
      type: "registry:block",
      hasPreview: true,
      previewSourceFile: { path: "missing/_preview.tsx" },
    });
    expect((await getRegistryPreviewData({ name: "sample" })).item?.preview).toBeNull();
  });
});
