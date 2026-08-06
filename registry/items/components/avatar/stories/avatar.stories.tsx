import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconPlus } from "@tabler/icons-react";

import StoryWrapper from "@/components/ui/story-wrapper";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An image element with a fallback for representing the user. Built on Base UI Avatar. See https://ui.shadcn.com/docs/components/base/avatar",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-lg flex-wrap items-center justify-center gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const people = [
  { src: "https://github.com/shadcn.png", alt: "@shadcn", fallback: "CN" },
  {
    src: "https://github.com/maxleiter.png",
    alt: "@maxleiter",
    fallback: "ML",
  },
  {
    src: "https://github.com/evilrabbit.png",
    alt: "@evilrabbit",
    fallback: "ER",
  },
] as const;

export const Default: Story = {
  args: {
    size: "default",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="Broken" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Badge: Story = {
  render: () => (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        <AvatarBadge>
          <IconPlus />
        </AvatarBadge>
      </Avatar>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      {(["sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {people.map((person) => (
        <Avatar key={person.alt}>
          <AvatarImage src={person.src} alt={person.alt} />
          <AvatarFallback>{person.fallback}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
};

export const GroupCount: Story = {
  name: "Group with count",
  render: () => (
    <AvatarGroup>
      {people.map((person) => (
        <Avatar key={person.alt}>
          <AvatarImage src={person.src} alt={person.alt} />
          <AvatarFallback>{person.fallback}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};

export const GroupCountIcon: Story = {
  name: "Group with icon count",
  render: () => (
    <AvatarGroup>
      {people.map((person) => (
        <Avatar key={person.alt} size="lg">
          <AvatarImage src={person.src} alt={person.alt} />
          <AvatarFallback>{person.fallback}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>
        <IconPlus />
      </AvatarGroupCount>
    </AvatarGroup>
  ),
};

export const Initials: Story = {
  name: "Initials only",
  render: () => (
    <>
      {(["AB", "CD", "EF", "GH"] as const).map((initials) => (
        <Avatar key={initials}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </>
  ),
};
