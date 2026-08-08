"use client";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./message-scroller";

const previewMessages = Array.from({ length: 24 }, (_, index) => ({
  id: String(index + 1),
  text:
    index % 2 === 0
      ? `Assistant: message ${index + 1} — spacing, tokens, and chat layout notes.`
      : `You: message ${index + 1} — continue with the summary, please.`,
}));

export function Preview() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="h-72 w-full max-w-md rounded-xl border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="gap-3 p-3">
            {previewMessages.map((message, index) => (
              <MessageScrollerItem
                key={message.id}
                scrollAnchor={index === previewMessages.length - 1}
                className="rounded-lg bg-muted/60 px-3 py-2 text-sm"
              >
                {message.text}
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
