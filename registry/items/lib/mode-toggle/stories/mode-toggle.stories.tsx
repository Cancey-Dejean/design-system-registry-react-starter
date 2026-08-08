import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { ModeToggle } from "../mode-toggle";

function ModeStatus() {
  const [mode, setMode] = useState<string>("…");
  const [resolved, setResolved] = useState<string>("…");

  useEffect(() => {
    const read = () => {
      const stored = window.localStorage.getItem("theme") ?? "auto";
      setMode(stored);
      setResolved(
        document.documentElement.classList.contains("dark")
          ? "dark"
          : document.documentElement.classList.contains("light")
            ? "light"
            : "unknown",
      );
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });
    window.addEventListener("storage", read);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", read);
    };
  }, []);

  return (
    <p className="text-center text-sm text-muted-foreground">
      Stored: <span className="font-mono text-foreground">{mode}</span>
      {" · "}
      Resolved: <span className="font-mono text-foreground">{resolved}</span>
    </p>
  );
}

const meta = {
  title: "Lib/Mode Toggle",
  component: ModeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Cycles light, dark, and system theme modes and persists the choice in localStorage.",
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
} satisfies Meta<typeof ModeToggle>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <>
      <ModeToggle />
      <ModeStatus />
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        Click to cycle light → dark → auto. Preference is stored under the `theme` key.
      </p>
    </>
  ),
};

export const CustomClassName: Story = {
  name: "Custom className",
  render: () => (
    <>
      <ModeToggle className="inline-flex size-10 items-center justify-center rounded-lg border border-input bg-muted text-foreground transition-colors hover:bg-accent" />
      <ModeStatus />
    </>
  ),
};
