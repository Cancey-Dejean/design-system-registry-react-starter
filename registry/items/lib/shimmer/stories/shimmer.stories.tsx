import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@registry/lib/story-wrapper";
import { cn } from "cn";

import {
  shimmerAngleClasses,
  shimmerClass,
  shimmerColorClasses,
  shimmerDurationClasses,
  shimmerNoneClass,
  shimmerOnceClass,
  shimmerReverseClass,
  shimmerSpreadClasses,
} from "../shimmer";

const meta: Meta = {
  title: "Utilities/Shimmer",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'CSS utilities for text shimmer. Requires `@import "shadcn/tailwind.css"`. See https://ui.shadcn.com/docs/utils/shimmer',
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="p-6">
        <Story />
      </StoryWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <p className={cn(shimmerClass, "text-muted-foreground text-sm")}>
      Generating response…
    </p>
  ),
};

export const Color: Story = {
  render: () => (
    <div className="text-muted-foreground flex flex-col items-center gap-3 text-sm">
      <p className={cn(shimmerClass, shimmerColorClasses.blue)}>
        Generating response…
      </p>
      <p className={cn(shimmerClass, shimmerColorClasses.brand)}>
        Generating response…
      </p>
    </div>
  ),
};

export const Duration: Story = {
  render: () => (
    <div className="text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className={shimmerClass}>Generating response…</p>
        <span className="font-mono text-xs">shimmer</span>
      </div>
      <div className="flex flex-col gap-2">
        <p className={cn(shimmerClass, shimmerDurationClasses[1000])}>
          Generating response…
        </p>
        <span className="font-mono text-xs">shimmer-duration-1000</span>
      </div>
    </div>
  ),
};

export const Spread: Story = {
  render: () => (
    <div className="text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className={cn(shimmerClass, shimmerSpreadClasses[4])}>
          Generating response…
        </p>
        <span className="font-mono text-xs">shimmer-spread-4</span>
      </div>
      <div className="flex flex-col gap-2">
        <p className={cn(shimmerClass, shimmerSpreadClasses[24])}>
          Generating response…
        </p>
        <span className="font-mono text-xs">shimmer-spread-24</span>
      </div>
    </div>
  ),
};

export const Angle: Story = {
  render: () => (
    <div className="text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className={shimmerClass}>Generating response…</p>
        <span className="font-mono text-xs">shimmer</span>
      </div>
      <div className="flex flex-col gap-2">
        <p className={cn(shimmerClass, shimmerAngleClasses[45])}>
          Generating response…
        </p>
        <span className="font-mono text-xs">shimmer-angle-45</span>
      </div>
    </div>
  ),
};

export const Reverse: Story = {
  render: () => (
    <p className={cn(shimmerReverseClass, "text-muted-foreground text-sm")}>
      Generating response…
    </p>
  ),
};

export const PlayOnce: Story = {
  name: "Play Once",
  render: function PlayOnceStory() {
    const [key, setKey] = useState(0);

    return (
      <div className="text-muted-foreground flex flex-col items-center gap-4 text-sm">
        <p
          key={key}
          className={cn(
            shimmerOnceClass,
            shimmerDurationClasses[1100],
            "text-foreground",
          )}
        >
          Response generated.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setKey((k) => k + 1)}
        >
          Replay
        </Button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="text-muted-foreground flex flex-col items-center gap-3 text-sm">
      <p className={cn(shimmerClass, "md:shimmer-none")}>
        Generating response…
      </p>
      <span className="font-mono text-xs">shimmer md:shimmer-none</span>
      <p className={cn(shimmerClass, shimmerNoneClass)}>Generating response…</p>
      <span className="font-mono text-xs">shimmer shimmer-none</span>
    </div>
  ),
};
