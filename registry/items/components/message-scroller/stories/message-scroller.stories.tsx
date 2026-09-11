import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@registry/lib/story-wrapper";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "../message-scroller";

const seedMessages = Array.from({ length: 30 }, (_, index) => ({
  id: `seed-${index + 1}`,
  author: index % 2 === 0 ? "assistant" : "you",
  text:
    index % 2 === 0
      ? `Here is assistant reply #${index + 1}. Scroll away from the bottom to reveal the jump control.`
      : `User note #${index + 1}. Thanks for the update.`,
}));

const meta = {
  title: "Components/Message Scroller",
  component: MessageScroller,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Auto-scrolling container for chat message lists with jump-to controls. Built on @shadcn/react/message-scroller. See https://ui.shadcn.com/docs/components/base/message-scroller",
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
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj;

function MessageRows({
  messages,
}: {
  messages: { id: string; author: string; text: string }[];
}) {
  return (
    <>
      {messages.map((message, index) => (
        <MessageScrollerItem
          key={message.id}
          scrollAnchor={index === messages.length - 1}
          className={
            message.author === "you"
              ? "bg-primary text-primary-foreground ml-auto max-w-[85%] rounded-lg px-3 py-2 text-sm"
              : "bg-muted max-w-[85%] rounded-lg px-3 py-2 text-sm"
          }
        >
          {message.text}
        </MessageScrollerItem>
      ))}
    </>
  );
}

export const Default: Story = {
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-96 rounded-xl border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="gap-3 p-3">
            <MessageRows messages={seedMessages} />
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  ),
};

export const ScrollToStart: Story = {
  name: "Scroll to start button",
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-96 rounded-xl border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="gap-3 p-3">
            <MessageRows messages={seedMessages} />
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="start" />
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    </MessageScrollerProvider>
  ),
};

function LiveThreadDemo() {
  const [messages, setMessages] = useState(seedMessages.slice(0, 12));

  return (
    <div className="flex flex-col gap-3">
      <MessageScrollerProvider>
        <MessageScroller className="h-80 rounded-xl border">
          <MessageScrollerViewport>
            <MessageScrollerContent className="gap-3 p-3">
              <MessageRows messages={messages} />
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <Button
        size="sm"
        className="self-start"
        onClick={() => {
          setMessages((current) => {
            const nextIndex = current.length + 1;
            return [
              ...current,
              {
                id: `live-${nextIndex}`,
                author: nextIndex % 2 === 0 ? "you" : "assistant",
                text:
                  nextIndex % 2 === 0
                    ? `You: live message #${nextIndex}`
                    : `Assistant: live reply #${nextIndex}`,
              },
            ];
          });
        }}
      >
        Append message
      </Button>
    </div>
  );
}

export const LiveAppend: Story = {
  name: "Live append",
  render: () => <LiveThreadDemo />,
};
