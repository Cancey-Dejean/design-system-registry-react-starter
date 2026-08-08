import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import { useIsMobile } from "../use-mobile";

function ViewportStatus() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-2xl font-semibold tracking-tight">{isMobile ? "Mobile" : "Desktop"}</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        `useIsMobile()` is currently{" "}
        <span className="font-mono text-foreground">{String(isMobile)}</span>. Query:{" "}
        <span className="font-mono text-foreground">(max-width: 63.999rem)</span>
      </p>
      <p className="text-sm text-muted-foreground">
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
          <p className="text-sm text-muted-foreground">
            Render a sheet trigger or bottom nav when the viewport is mobile.
          </p>
        </div>
      ) : (
        <div className="flex gap-4">
          <aside className="w-28 shrink-0 rounded-md bg-muted p-3 text-xs text-muted-foreground">
            Side nav
          </aside>
          <div className="space-y-2">
            <p className="text-sm font-medium">Wide chrome</p>
            <p className="text-sm text-muted-foreground">
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
