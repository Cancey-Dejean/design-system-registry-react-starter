import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Checkbox } from "../checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A control that allows the user to toggle between checked and not checked. Built on Base UI Checkbox. See https://ui.shadcn.com/docs/components/base/checkbox",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm leading-none font-medium">
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="newsletter" defaultChecked />
      <label htmlFor="newsletter" className="text-sm leading-none font-medium">
        Subscribe to newsletter
      </label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-off" disabled />
        <label
          htmlFor="disabled-off"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled unchecked
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-on" disabled defaultChecked />
        <label
          htmlFor="disabled-on"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled checked
        </label>
      </div>
    </>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex items-start gap-2">
      <Checkbox id="must-agree" aria-invalid defaultChecked />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="must-agree"
          className="text-sm leading-none font-medium"
        >
          I agree to the terms
        </label>
        <p className="text-destructive text-sm">
          You must accept the terms to continue.
        </p>
      </div>
    </div>
  ),
};

export const Group: Story = {
  name: "Options group",
  render: () => (
    <div className="grid gap-3">
      <p className="text-sm font-medium">Notify me about…</p>
      {(
        [
          ["comments", "Comments", true],
          ["mentions", "Mentions", false],
          ["follows", "New followers", false],
        ] as const
      ).map(([id, label, defaultChecked]) => (
        <div key={id} className="flex items-center gap-2">
          <Checkbox id={id} defaultChecked={defaultChecked} />
          <label htmlFor={id} className="text-sm leading-none">
            {label}
          </label>
        </div>
      ))}
    </div>
  ),
};

function ControlledDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="controlled"
          checked={checked}
          onCheckedChange={(value) => setChecked(value)}
        />
        <label
          htmlFor="controlled"
          className="text-sm leading-none font-medium"
        >
          Controlled checkbox
        </label>
      </div>
      <p className="text-muted-foreground text-sm">
        Checked: {checked ? "true" : "false"}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
