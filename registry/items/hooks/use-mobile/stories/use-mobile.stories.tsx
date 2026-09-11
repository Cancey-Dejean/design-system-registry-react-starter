import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@registry/lib/story-wrapper";

import { useIsMobile } from "../use-mobile";

function ViewportStatus() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-2xl font-semibold tracking-tight">
        {isMobile ? "Mobile" : "Desktop"}
      </p>
      <p className="text-muted-foreground max-w-sm text-sm">
        `useIsMobile()` is currently{" "}
        <span className="text-foreground font-mono">{String(isMobile)}</span>.
        Query:{" "}
        <span className="text-foreground font-mono">
          (max-width: 63.999rem)
        </span>
      </p>
      <p className="text-muted-foreground text-sm">
        Resize the Storybook viewport or browser width to update the result.
      </p>
    </div>
  );
}

function LayoutSwitchDemo() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-md rounded-lg border p-4">
      {isMobile ? (
        <div className="space-y-2">
          <p className="text-sm font-medium">Compact chrome</p>
          <p className="text-muted-foreground text-sm">
            Render a sheet trigger or bottom nav when the viewport is mobile.
          </p>
        </div>
      ) : (
        <div className="flex gap-4">
          <aside className="bg-muted text-muted-foreground w-28 shrink-0 rounded-md p-3 text-xs">
            Side nav
          </aside>
          <div className="space-y-2">
            <p className="text-sm font-medium">Wide chrome</p>
            <p className="text-muted-foreground text-sm">
              Keep a persistent rail when there is enough width.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const meta = {
  title: "Hooks/useIsMobile",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Detects whether the viewport matches a mobile max-width media query (`max-width: 63.999rem`).",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full justify-center">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ViewportStatus />,
};

export const LayoutSwitch: Story = {
  name: "Layout switch",
  render: () => <LayoutSwitchDemo />,
};
