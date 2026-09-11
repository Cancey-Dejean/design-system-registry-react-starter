import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconBold, IconItalic, IconUnderline } from "@tabler/icons-react";
import { useState } from "react";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Toggle } from "../toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A two-state button that can be either on or off. See https://ui.shadcn.com/docs/components/base/toggle",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <IconBold />
    </Toggle>
  ),
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      <IconItalic />
    </Toggle>
  ),
};

export const WithText: Story = {
  name: "With text",
  render: () => (
    <Toggle aria-label="Toggle italic">
      <IconItalic />
      Italic
    </Toggle>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Toggle size="sm" aria-label="Small bold">
        <IconBold />
      </Toggle>
      <Toggle size="default" aria-label="Default bold">
        <IconBold />
      </Toggle>
      <Toggle size="lg" aria-label="Large bold">
        <IconBold />
      </Toggle>
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <Toggle disabled aria-label="Disabled off">
        <IconBold />
      </Toggle>
      <Toggle disabled defaultPressed aria-label="Disabled on">
        <IconItalic />
      </Toggle>
    </>
  ),
};

export const FormattingGroup: Story = {
  name: "Formatting group",
  render: () => (
    <div className="flex items-center gap-1">
      <Toggle aria-label="Toggle bold" variant="outline">
        <IconBold />
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <IconItalic />
      </Toggle>
      <Toggle aria-label="Toggle underline" variant="outline">
        <IconUnderline />
      </Toggle>
    </div>
  ),
};

function ControlledDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Toggle bold"
        variant="outline"
      >
        <IconBold />
      </Toggle>
      <p className="text-muted-foreground text-sm">
        Pressed: {String(pressed)}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
