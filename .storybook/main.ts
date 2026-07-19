import type { StorybookConfig } from "@storybook/tanstack-react";

const config: StorybookConfig = {
  // Exclude `_registry.mdx` — those are registry docs, not Storybook stories.
  stories: ["../registry/items/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-links",
    "@storybook/addon-vitest",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/tanstack-react",
};
export default config;
