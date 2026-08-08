import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCommand, IconCornerDownLeft } from "@tabler/icons-react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { Kbd, KbdGroup } from "../kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Used to display textual user input from keyboard. See https://ui.shadcn.com/docs/components/base/kbd",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-lg flex-wrap items-center gap-3">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
};

export const SingleKeys: Story = {
  name: "Single keys",
  render: () => (
    <>
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⌃</Kbd>
      <Kbd>Esc</Kbd>
    </>
  ),
};

export const Shortcut: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const MultipleShortcuts: Story = {
  name: "Multiple shortcuts",
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center justify-between gap-6">
        <span>Open command palette</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between gap-6">
        <span>Save</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between gap-6">
        <span>Submit</span>
        <Kbd>
          <IconCornerDownLeft />
        </Kbd>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  name: "With icons",
  render: () => (
    <KbdGroup>
      <Kbd>
        <IconCommand />
      </Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
};
