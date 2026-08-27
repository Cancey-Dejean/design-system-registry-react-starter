import { Checkbox } from "@registry/components/checkbox/checkbox";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/components/ui/input";
import StoryWrapper from "@/components/ui/story-wrapper";

import { Label } from "../label";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Renders an accessible label associated with controls. See https://ui.shadcn.com/docs/components/base/label",
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
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="name">
        Name <span className="text-destructive">*</span>
      </Label>
      <Input id="name" required placeholder="Jane Doe" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  name: "With checkbox",
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const DisabledGroup: Story = {
  name: "Disabled group",
  render: () => (
    <div className="group grid gap-2" data-disabled="true">
      <Label htmlFor="disabled-email">Email</Label>
      <Input id="disabled-email" type="email" disabled placeholder="disabled@example.com" />
    </div>
  ),
};

export const PeerDisabled: Story = {
  name: "Peer disabled",
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="peer-email">Email</Label>
      <Input
        id="peer-email"
        className="peer"
        type="email"
        disabled
        placeholder="disabled@example.com"
      />
    </div>
  ),
};
