import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Skeleton } from "../skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Use to show a placeholder while content is loading. See https://ui.shadcn.com/docs/components/base/skeleton",
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
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-3 rounded-xl border p-4">
      <Skeleton className="h-40 w-full rounded-lg" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="grid gap-4">
      {["one", "two", "three"].map((key) => (
        <div key={key} className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TextBlock: Story = {
  name: "Text block",
  render: () => (
    <div className="grid gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  ),
};
