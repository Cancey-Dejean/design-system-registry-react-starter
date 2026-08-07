import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "../bubble";

const meta: Meta<typeof Bubble> = {
  title: "Components/Bubble",
  component: Bubble,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Colored message surfaces for chat and conversation UIs. See https://ui.shadcn.com/docs/components/base/bubble",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-md p-6">
        <Story />
      </StoryWrapper>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"],
    },
    align: {
      control: "select",
      options: ["start", "end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    align: "start",
  },
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
  ),
};

export const Conversation: Story = {
  render: () => (
    <BubbleGroup>
      <Bubble variant="muted" align="start">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>Summarize the design review notes from yesterday.</BubbleContent>
      </Bubble>
      <Bubble variant="muted" align="start">
        <BubbleContent>
          Here is a short summary: the team aligned on spacing tokens, deferred the nav rework, and
          assigned ownership of the form docs.
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

export const Variants: Story = {
  name: "All variants",
  render: () => (
    <BubbleGroup>
      {(
        ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const
      ).map((variant) => (
        <Bubble key={variant} variant={variant} align={variant === "default" ? "end" : "start"}>
          <BubbleContent>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} — sample message surface.
          </BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  ),
};

export const Alignment: Story = {
  render: () => (
    <BubbleGroup>
      <Bubble variant="muted" align="start">
        <BubbleContent>Aligned to the start (incoming).</BubbleContent>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>Aligned to the end (outgoing).</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

export const WithReactions: Story = {
  name: "With reactions",
  render: () => (
    <BubbleGroup className="gap-6 pt-4 pb-6">
      <Bubble variant="muted" align="start">
        <BubbleContent>Deploy the preview and share the link when it is ready.</BubbleContent>
        <BubbleReactions side="bottom" align="start">
          <span className="px-1.5 text-xs">👍 3</span>
          <span className="px-1.5 text-xs">❤️ 1</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>Preview is live — check the latest build.</BubbleContent>
        <BubbleReactions side="bottom" align="end">
          <span className="px-1.5 text-xs">🎉 4</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="secondary" align="start">
        <BubbleContent>Reactions can also sit above the bubble.</BubbleContent>
        <BubbleReactions side="top" align="start">
          <span className="px-1.5 text-xs">👀 2</span>
        </BubbleReactions>
      </Bubble>
    </BubbleGroup>
  ),
};

export const MultiContent: Story = {
  name: "Stacked content",
  render: () => (
    <BubbleGroup>
      <Bubble variant="muted" align="start">
        <BubbleContent>First message in a group.</BubbleContent>
        <BubbleContent className="opacity-90">A second block in the same bubble.</BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>
          Longer replies wrap naturally within the max width so multi-line assistant answers stay
          readable.
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

export const InteractiveContent: Story = {
  name: "Interactive content",
  render: () => (
    <BubbleGroup>
      <Bubble variant="outline" align="start">
        <BubbleContent render={<button type="button" />}>
          Click me — bubble content as a button
        </BubbleContent>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent render={<a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" />}>
          Open documentation
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};
