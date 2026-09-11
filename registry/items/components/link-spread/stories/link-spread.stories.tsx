import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@registry/lib/story-wrapper";

import LinkSpread from "../link-spread";
import { DemoCard } from "./demo-card";

const meta: Meta<typeof LinkSpread> = {
  title: "Components/Link Spread",
  tags: ["autodocs"],
  component: LinkSpread,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    href: "#",
    newTab: false,
    "aria-label": "View card",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DemoCard
      title="Card title"
      description="The entire card is clickable via LinkSpread."
      imageSrc="https://dummyimage.com/600x400/ababab/fff"
      imageAlt="Link Spread demo"
      link={args}
    />
  ),
};
