import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Input } from "../input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays a form input field or a component that looks like an input field. Built on Base UI Input. See https://ui.shadcn.com/docs/components/base/input",
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
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "search",
        "number",
        "file",
        "tel",
        "url",
      ],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "email",
    placeholder: "Email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="grid w-full gap-2">
      <label htmlFor="email" className="text-sm leading-none font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const WithText: Story = {
  name: "With helper text",
  render: () => (
    <div className="grid w-full gap-2">
      <label htmlFor="username" className="text-sm leading-none font-medium">
        Username
      </label>
      <Input id="username" placeholder="cade" />
      <p className="text-muted-foreground text-sm">
        This is your public display name.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Email",
    defaultValue: "you@example.com",
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="grid w-full gap-2">
      <label htmlFor="invalid" className="text-sm leading-none font-medium">
        Email
      </label>
      <Input
        id="invalid"
        type="email"
        defaultValue="not-an-email"
        aria-invalid
      />
      <p className="text-destructive text-sm">
        Please enter a valid email address.
      </p>
    </div>
  ),
};

export const File: Story = {
  args: {
    type: "file",
  },
};

function ControlledDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full gap-2">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type something…"
      />
      <p className="text-muted-foreground text-sm">Value: {value || "—"}</p>
    </div>
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledDemo {...args} />,
};
