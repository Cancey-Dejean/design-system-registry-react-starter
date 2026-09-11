import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCheck, IconAlertTriangle } from "@tabler/icons-react";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Badge } from "../badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays a badge or a component that looks like a badge. See https://ui.shadcn.com/docs/components/base/badge",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-lg flex-wrap items-center gap-2">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const Variants: Story = {
  name: "All variants",
  render: () => (
    <>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </>
  ),
};

export const WithIcon: Story = {
  name: "With icon",
  render: () => (
    <>
      <Badge>
        <IconCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="secondary">
        Draft
        <IconCheck data-icon="inline-end" />
      </Badge>
      <Badge variant="destructive">
        <IconAlertTriangle data-icon="inline-start" />
        Failed
      </Badge>
      <Badge variant="outline">
        <IconCheck data-icon="inline-start" />
        Outline
      </Badge>
    </>
  ),
};

export const AsLink: Story = {
  name: "As link",
  render: () => (
    <Badge
      render={
        <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" />
      }
    >
      Documentation
    </Badge>
  ),
};

export const Status: Story = {
  name: "Status labels",
  render: () => (
    <>
      <Badge variant="secondary">In progress</Badge>
      <Badge className="bg-emerald-600 text-white dark:bg-emerald-700">
        Active
      </Badge>
      <Badge variant="destructive">Blocked</Badge>
      <Badge variant="outline">Queued</Badge>
    </>
  ),
};
