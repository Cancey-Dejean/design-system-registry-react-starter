import { Label } from "@registry/components/label/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "../native-select";

const meta = {
  title: "Components/Native Select",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A styled native HTML select element. See https://ui.shadcn.com/docs/components/base/native-select",
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
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="apple" aria-label="Fruit">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      <NativeSelectOption value="grapes">Grapes</NativeSelectOption>
      <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
    </NativeSelect>
  ),
};

export const Small: Story = {
  render: () => (
    <NativeSelect size="sm" defaultValue="sm" aria-label="Size">
      <NativeSelectOption value="sm">Small</NativeSelectOption>
      <NativeSelectOption value="default">Default</NativeSelectOption>
    </NativeSelect>
  ),
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="fruit">Fruit</Label>
      <NativeSelect id="fruit" defaultValue="banana" className="w-full">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const OptGroups: Story = {
  name: "Option groups",
  render: () => (
    <NativeSelect defaultValue="orange" aria-label="Produce" className="w-full">
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOptGroup label="Berries">
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        <NativeSelectOption value="strawberry">Strawberry</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Citrus">
        <NativeSelectOption value="orange">Orange</NativeSelectOption>
        <NativeSelectOption value="lemon">Lemon</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled defaultValue="apple" aria-label="Disabled select">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="invalid-fruit">Fruit</Label>
      <NativeSelect id="invalid-fruit" aria-invalid defaultValue="" className="w-full">
        <NativeSelectOption value="" disabled>
          Select a fruit
        </NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
      <p className="text-sm text-destructive">Please choose a fruit.</p>
    </div>
  ),
};

function ControlledDemo() {
  const [value, setValue] = useState("apple");

  return (
    <div className="grid gap-2">
      <NativeSelect
        aria-label="Controlled fruit"
        className="w-full"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelect>
      <p className="text-sm text-muted-foreground">
        Value: <span className="font-mono text-foreground">{value}</span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
