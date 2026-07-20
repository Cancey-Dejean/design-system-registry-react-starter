"use client";

import LinkSpread from "./link-spread";
import { DemoCard } from "./stories/demo-card";

export function Preview() {
  return (
    <DemoCard
      title="Card title"
      description="The entire card is clickable via LinkSpread."
      imageSrc="https://dummyimage.com/600x400/ababab/fff"
      imageAlt="Link Spread demo"
    >
      <LinkSpread href="#" aria-label="View card" />
    </DemoCard>
  );
}
