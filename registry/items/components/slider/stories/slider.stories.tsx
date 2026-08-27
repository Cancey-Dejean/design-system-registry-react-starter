import { Label } from "@registry/components/label/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { Slider } from "../slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An input where the user selects a value from within a given range. See https://ui.shadcn.com/docs/components/base/slider",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />,
};

export const Range: Story = {
  render: () => <Slider defaultValue={[25, 75]} max={100} step={1} aria-label="Price range" />,
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="grid gap-3">
      <Label htmlFor="opacity">Opacity</Label>
      <Slider id="opacity" defaultValue={[33]} max={100} step={1} />
    </div>
  ),
};

export const Steps: Story = {
  render: () => <Slider defaultValue={[2]} min={0} max={5} step={1} aria-label="Steps" />,
};

export const Disabled: Story = {
  render: () => (
    <Slider defaultValue={[40]} max={100} step={1} disabled aria-label="Disabled slider" />
  ),
};

function ControlledDemo() {
  const [value, setValue] = useState([45]);

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Volume</span>
        <span className="text-muted-foreground tabular-nums">{value[0]}%</span>
      </div>
      <Slider
        value={value}
        onValueChange={(next) => setValue(Array.isArray(next) ? [...next] : [next])}
        max={100}
        step={1}
        aria-label="Volume"
      />
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

function ControlledRangeDemo() {
  const [value, setValue] = useState([20, 80]);

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Budget</span>
        <span className="text-muted-foreground tabular-nums">
          ${value[0]} – ${value[1]}
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={(next) => setValue(Array.isArray(next) ? [...next] : [next])}
        max={100}
        step={1}
        aria-label="Budget"
      />
    </div>
  );
}

export const ControlledRange: Story = {
  name: "Controlled range",
  render: () => <ControlledRangeDemo />,
};
