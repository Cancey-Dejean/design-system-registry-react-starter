import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconSearch, IconCopy, IconInfoCircle } from "@tabler/icons-react";

import StoryWrapper from "@registry/lib/story-wrapper";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../input-group";

const meta = {
  title: "Components/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Display additional information or actions to an input or textarea. See https://ui.shadcn.com/docs/components/base/input-group",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
};

export const Icon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
    </InputGroup>
  ),
};

export const Button: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter URL" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <IconCopy />
          Copy
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const BothSides: Story = {
  name: "Both sides",
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const BlockLabel: Story = {
  name: "Block label",
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText className="text-foreground font-medium">
          Email
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="email" placeholder="you@example.com" />
      <InputGroupAddon align="block-end">
        <InputGroupText>
          <IconInfoCircle />
          We will never share your email.
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Textarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="Leave a comment…" rows={4} />
      <InputGroupAddon align="block-end">
        <InputGroupText>0/280</InputGroupText>
        <InputGroupButton size="sm" className="ml-auto">
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          placeholder="username"
          aria-invalid
          defaultValue="!!"
        />
      </InputGroup>
      <p className="text-destructive text-sm">
        Username can only contain letters and numbers.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup data-disabled="true">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        disabled
        placeholder="example.com"
        defaultValue="docs.example.com"
      />
    </InputGroup>
  ),
};
