import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Container } from "../container";
import { CONTAINER_SIZES } from "../container.variants";
import { DemoContainer } from "./demo-container";

const meta: Meta = {
  title: "Components/Container",
  component: Container,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    size: "base",
  },
  argTypes: {
    size: {
      control: "select",
      options: CONTAINER_SIZES,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DemoContainer {...args} />,
};
