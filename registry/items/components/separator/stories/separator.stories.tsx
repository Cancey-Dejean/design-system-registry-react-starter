import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import { Separator } from "../separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Visually or semantically separates content. Built on Base UI Separator. See https://ui.shadcn.com/docs/components/base/separator",
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
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="space-y-1">
      <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
      <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      <Separator {...args} className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm">Above the separator</div>
      <Separator />
      <div className="text-sm">Below the separator</div>
    </div>
  ),
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex h-20 w-full max-w-sm items-center justify-center gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  render: () => (
    <>
      <div className="text-sm">Left</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Center</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Right</div>
    </>
  ),
};

export const InList: Story = {
  name: "In content list",
  render: () => (
    <div className="space-y-0">
      {["Profile", "Billing", "Team", "Subscription"].map((item, index, items) => (
        <div key={item}>
          <div className="py-3 text-sm font-medium">{item}</div>
          {index < items.length - 1 ? <Separator /> : null}
        </div>
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <Separator className="flex-1" />
      <span>or continue with</span>
      <Separator className="flex-1" />
    </div>
  ),
};
