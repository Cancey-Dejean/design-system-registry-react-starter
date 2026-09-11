import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@registry/lib/story-wrapper";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";

const meta = {
  title: "Components/Hover Card",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "For sighted users to preview content available behind a link. Built on Base UI Preview Card. See https://ui.shadcn.com/docs/components/base/hover-card",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full items-center justify-center py-16">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        href="https://github.com/shadcn"
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        @shadcn
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <p className="font-medium">@shadcn</p>
          <p className="text-muted-foreground text-sm">
            Building open-source UI that works out of the box.
          </p>
          <p className="text-muted-foreground text-xs">Joined December 2021</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithButton: Story = {
  name: "Button trigger",
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>
        @vercel
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <p className="font-medium">Vercel</p>
          <p className="text-muted-foreground text-sm">
            Develop. Preview. Ship. For the best frontend teams.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const SideTop: Story = {
  name: "Side top",
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        href="#"
        className="text-sm font-medium underline-offset-4 hover:underline"
        onClick={(event) => event.preventDefault()}
      >
        Hover me
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <p className="text-sm">This card opens above the trigger.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const AlignStart: Story = {
  name: "Align start",
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        href="#"
        className="text-sm font-medium underline-offset-4 hover:underline"
        onClick={(event) => event.preventDefault()}
      >
        Align start
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <p className="text-sm">
          Content is aligned to the start of the trigger.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
};
