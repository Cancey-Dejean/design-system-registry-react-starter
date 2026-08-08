import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { THEME_STORAGE_KEY, ThemeToggle } from "../theme-toggle";

function ThemeStatus() {
  const [theme, setTheme] = useState<string>("…");
  const [stored, setStored] = useState<string>("…");

  useEffect(() => {
    const read = () => {
      setTheme(document.documentElement.getAttribute("data-theme") ?? "unset");
      setStored(window.localStorage.getItem(THEME_STORAGE_KEY) ?? "unset");
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("storage", read);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", read);
    };
  }, []);

  return (
    <p className="text-center text-sm text-muted-foreground">
      data-theme: <span className="font-mono text-foreground">{theme}</span>
      {" · "}
      localStorage: <span className="font-mono text-foreground">{stored}</span>
    </p>
  );
}

const meta = {
  title: "Lib/Theme Toggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Switches between branded data-theme palettes (theme-primary, theme-secondary, theme-tertiary) and persists the choice.",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <>
      <ThemeToggle />
      <ThemeStatus />
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        Click a palette to set `data-theme` on the document root. Wire CSS for each value in your
        app.
      </p>
    </>
  ),
};

export const CustomLayout: Story = {
  name: "Custom layout",
  render: () => (
    <>
      <ThemeToggle className="flex-col items-stretch sm:flex-row" />
      <ThemeStatus />
    </>
  ),
};
