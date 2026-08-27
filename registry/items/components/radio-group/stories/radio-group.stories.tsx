import { Label } from "@registry/components/label/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { RadioGroup, RadioGroupItem } from "../radio-group";

const meta = {
  title: "Components/Radio Group",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A set of checkable buttons where only one can be checked at a time. See https://ui.shadcn.com/docs/components/base/radio-group",
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
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-one" id="d1" />
        <Label htmlFor="d1">Option one</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-two" id="d2" />
        <Label htmlFor="d2">Option two</Label>
      </div>
    </RadioGroup>
  ),
};

export const DisabledItem: Story = {
  name: "Disabled item",
  render: () => (
    <RadioGroup defaultValue="apple">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="apple" id="f1" />
        <Label htmlFor="f1">Apple</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="banana" id="f2" disabled />
        <Label htmlFor="f2" className="opacity-50">
          Banana (unavailable)
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="cherry" id="f3" />
        <Label htmlFor="f3">Cherry</Label>
      </div>
    </RadioGroup>
  ),
};

function ControlledDemo() {
  const [value, setValue] = useState("card");

  return (
    <div className="grid gap-3">
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="card" id="pay-card" />
          <Label htmlFor="pay-card">Card</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="paypal" id="pay-paypal" />
          <Label htmlFor="pay-paypal">PayPal</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="transfer" id="pay-transfer" />
          <Label htmlFor="pay-transfer">Bank transfer</Label>
        </div>
      </RadioGroup>
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
