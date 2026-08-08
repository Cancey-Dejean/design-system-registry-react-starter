import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { Textarea } from "../textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays a multi-line text input field. See https://ui.shadcn.com/docs/components/base/textarea",
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
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    rows: {
      control: { type: "number", min: 1, max: 20 },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="grid w-full gap-2">
      <label htmlFor="message" className="text-sm leading-none font-medium">
        Your message
      </label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
};

export const WithText: Story = {
  name: "With helper text",
  render: () => (
    <div className="grid w-full gap-2">
      <label htmlFor="bio" className="text-sm leading-none font-medium">
        Bio
      </label>
      <Textarea id="bio" placeholder="Tell us a little bit about yourself" />
      <p className="text-sm text-muted-foreground">
        Your bio will be shown on your public profile.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Type your message here.",
    defaultValue: "This field is disabled.",
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="grid w-full gap-2">
      <label htmlFor="invalid" className="text-sm leading-none font-medium">
        Feedback
      </label>
      <Textarea id="invalid" defaultValue="Hi" aria-invalid />
      <p className="text-sm text-destructive">Please enter at least 20 characters.</p>
    </div>
  ),
};

export const Rows: Story = {
  name: "Fixed rows",
  args: {
    rows: 6,
    placeholder: "Six rows of space…",
  },
};

function ControlledDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full gap-2">
      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Write something…"
      />
      <p className="text-sm text-muted-foreground">{value.length} characters</p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
