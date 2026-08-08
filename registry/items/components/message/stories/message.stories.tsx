import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import { Avatar, AvatarFallback } from "../../avatar/avatar";
import { Bubble, BubbleContent, BubbleReactions } from "../../bubble/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "../message";

const meta = {
  title: "Components/Message",
  component: Message,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Layout primitives for chat rows with avatars, headers, and footers. See https://ui.shadcn.com/docs/components/base/message",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    align: {
      control: "select",
      options: ["start", "end"],
    },
  },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Message align="start">
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Assistant</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
        <MessageFooter>Just now</MessageFooter>
      </MessageContent>
    </Message>
  ),
};

export const Conversation: Story = {
  render: () => (
    <MessageGroup>
      <Message align="start">
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>How can I help you today?</BubbleContent>
          </Bubble>
          <MessageFooter>9:41 AM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>You</MessageHeader>
          <Bubble variant="default" align="end">
            <BubbleContent>Summarize the design review notes from yesterday.</BubbleContent>
          </Bubble>
          <MessageFooter>9:42 AM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="start">
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              The team aligned on spacing tokens, deferred the nav rework, and assigned ownership of
              the form docs.
            </BubbleContent>
          </Bubble>
          <MessageFooter>9:43 AM</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};

export const WithoutAvatar: Story = {
  name: "Without avatar",
  render: () => (
    <MessageGroup>
      <Message align="start">
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>No avatar on this row.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble variant="default" align="end">
            <BubbleContent>Outgoing without avatar, too.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};

export const WithReactions: Story = {
  name: "With reactions",
  render: () => (
    <Message align="start">
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Assistant</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>That sounds good to me.</BubbleContent>
          <BubbleReactions side="bottom" align="start">
            <span className="px-1.5 text-xs">👍 2</span>
          </BubbleReactions>
        </Bubble>
        <MessageFooter>Edited · 10:12 AM</MessageFooter>
      </MessageContent>
    </Message>
  ),
};

export const HeaderOnly: Story = {
  name: "Header only",
  render: () => (
    <Message align="start">
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Jane Doe</MessageHeader>
        <Bubble variant="outline">
          <BubbleContent>Message content without a timestamp footer.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
};
