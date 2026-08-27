import { Avatar, AvatarFallback } from "@registry/components/avatar/avatar";
import { Bubble, BubbleContent } from "@registry/components/bubble/bubble";

import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "./message";

export function Preview() {
  return (
    <MessageGroup className="w-full max-w-md">
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
      <Message align="end">
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>You</MessageHeader>
          <Bubble variant="default" align="end">
            <BubbleContent>Summarize the design review notes.</BubbleContent>
          </Bubble>
          <MessageFooter>Just now</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
