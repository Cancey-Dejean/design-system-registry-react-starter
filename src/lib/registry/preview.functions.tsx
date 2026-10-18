import { createServerFn } from "@tanstack/react-start";

export const getRegistryPreview = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    if (
      !data ||
      typeof data !== "object" ||
      !("name" in data) ||
      typeof data.name !== "string" ||
      !data.name
    )
      throw new Error("Expected a registry item name.");
    return { name: data.name };
  })
  .handler(async ({ data }) => {
    const { getRegistryPreviewData } = await import("./preview.server");
    return getRegistryPreviewData(data);
  });
