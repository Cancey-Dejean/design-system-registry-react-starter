import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconBell, IconChevronRight, IconUser } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@registry/lib/story-wrapper";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../item";

const meta = {
  title: "Components/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A versatile component for displaying content in lists, cards, or menus. See https://ui.shadcn.com/docs/components/base/item",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <IconBell />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Push notifications</ItemTitle>
        <ItemDescription>
          Send me a push notification when something happens.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Enable
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Variants: Story = {
  render: () => (
    <ItemGroup>
      <Item variant="default">
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>Transparent border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>Bordered surface.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>Subtle background fill.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <ItemGroup>
      <Item variant="outline" size="default">
        <ItemMedia variant="icon">
          <IconUser />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default size</ItemTitle>
          <ItemDescription>Standard padding and gap.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <IconUser />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Small</ItemTitle>
          <ItemDescription>Slightly tighter layout.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <IconUser />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Extra small</ItemTitle>
          <ItemDescription>Compact for dense UIs.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const AsLink: Story = {
  name: "As link",
  render: () => (
    <Item variant="outline" render={<a href="https://ui.shadcn.com" />}>
      <ItemContent>
        <ItemTitle>Documentation</ItemTitle>
        <ItemDescription>
          Open the Item component docs on shadcn/ui.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <IconChevronRight className="text-muted-foreground size-4" />
      </ItemActions>
    </Item>
  ),
};

export const GroupWithSeparators: Story = {
  name: "Group with separators",
  render: () => (
    <ItemGroup>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Inbox</ItemTitle>
          <ItemDescription>3 unread messages</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Drafts</ItemTitle>
          <ItemDescription>2 unsent drafts</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Archive</ItemTitle>
          <ItemDescription>Older conversations</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const HeaderFooter: Story = {
  name: "Header and footer",
  render: () => (
    <Item variant="outline">
      <ItemHeader>
        <ItemTitle>Team plan</ItemTitle>
        <span className="text-muted-foreground text-xs">$29/mo</span>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>
          Unlimited seats, shared libraries, and priority support for growing
          teams.
        </ItemDescription>
      </ItemContent>
      <ItemFooter>
        <span className="text-muted-foreground text-xs">Billed annually</span>
        <Button size="sm">Upgrade</Button>
      </ItemFooter>
    </Item>
  ),
};
