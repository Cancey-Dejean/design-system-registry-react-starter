import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@registry/lib/story-wrapper";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../popover";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays rich content in a portal, triggered by a button. Built on Base UI Popover. See https://ui.shadcn.com/docs/components/base/popover",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full items-center justify-center">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignStart: Story = {
  name: "Align start",
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open
      </PopoverTrigger>
      <PopoverContent align="start">
        <p className="text-sm">Aligned to the start of the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
};
