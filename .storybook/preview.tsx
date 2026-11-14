import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/tanstack-react";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

// oxlint-disable-next-line import/no-unassigned-import -- side-effect CSS import
import "../registry/items/files/styles/globals.css";

const preview: Preview = {
  initialGlobals: { mode: "system", accent: "theme-primary" },
  globalTypes: {
    accent: {
      description: "Accent palette",
      toolbar: {
        title: "Palette",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "theme-primary", title: "Primary" },
          { value: "theme-secondary", title: "Secondary" },
          { value: "theme-tertiary", title: "Tertiary" },
        ],
      },
    },
  },
  parameters: {
    docs: {
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [],
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  decorators: [
    // The palette CSS keys off `data-theme` on <html> (see theme-secondary.css),
    // so mirror the toolbar's `accent` global onto the root element.
    (Story, context) => {
      const { accent } = context.globals;
      document.documentElement.setAttribute(
        "data-theme",
        typeof accent === "string" ? accent : "theme-primary",
      );
      return <Story />;
    },
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
