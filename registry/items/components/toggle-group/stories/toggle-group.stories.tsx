import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconUnderline,
} from "@tabler/icons-react";
import { useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { ToggleGroup, ToggleGroupItem } from "../toggle-group";

const meta = {
  title: "Components/Toggle Group",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A set of two-state buttons that can be toggled on or off. See https://ui.shadcn.com/docs/components/base/toggle-group",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={["bold"]} variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <IconBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <IconItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <IconUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Single: Story = {
  render: () => (
    <ToggleGroup defaultValue={["center"]} variant="outline" spacing={0}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <IconAlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <IconAlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <IconAlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Small: Story = {
  render: () => (
    <ToggleGroup size="sm" multiple defaultValue={["bold"]} variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <IconBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <IconItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <IconUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithLabels: Story = {
  name: "With labels",
  render: () => (
    <ToggleGroup multiple defaultValue={["bold"]} variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <IconBold />
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <IconItalic />
        Italic
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" defaultValue={["center"]} variant="outline" spacing={0}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <IconAlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <IconAlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <IconAlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={["bold"]} variant="outline" disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <IconBold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <IconItalic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <IconUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

function ControlledDemo() {
  const [value, setValue] = useState<string[]>(["bold"]);

  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup multiple value={value} onValueChange={setValue} variant="outline">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <IconBold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <IconItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <IconUnderline />
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-sm text-muted-foreground">
        Value: <span className="font-mono text-foreground">{JSON.stringify(value)}</span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
