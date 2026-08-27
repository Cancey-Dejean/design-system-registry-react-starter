import { Kbd } from "@registry/components/kbd/kbd";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@/components/ui/story-wrapper";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. See https://ui.shadcn.com/docs/components/base/tooltip",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <TooltipProvider>
          <div className="flex w-full items-center justify-center py-16">
            <Story />
          </div>
        </TooltipProvider>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" />}>{side}</TooltipTrigger>
          <TooltipContent side={side}>
            <p>Side {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithKeyboardHint: Story = {
  name: "With keyboard hint",
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Save</TooltipTrigger>
      <TooltipContent>
        <span>Save</span>
        <Kbd>⌘S</Kbd>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  name: "Long content",
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Details</TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>
          Tooltips work best for short, non-interactive hints. Keep copy focused on what the control
          does.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Delayed: Story = {
  render: () => (
    <TooltipProvider delay={500}>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Slow open</TooltipTrigger>
        <TooltipContent>
          <p>Opens after 500ms</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
