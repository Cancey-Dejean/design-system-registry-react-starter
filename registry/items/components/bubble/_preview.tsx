import { Bubble, BubbleContent, BubbleGroup } from "./bubble";

export function Preview() {
  return (
    <BubbleGroup className="w-full max-w-md">
      <Bubble variant="muted" align="start">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>Summarize the design review notes.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}
