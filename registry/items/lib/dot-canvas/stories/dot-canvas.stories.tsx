import StoryWrapper from "@registry/lib/story-wrapper";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DotCanvas, DOT_CANVAS_SIZES } from "../dot-canvas";
import { DemoDotCanvas } from "./demo-dot-canvas";

const meta: Meta = {
  title: "Lib/Dot Canvas",
  component: DotCanvas,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    size: 24,
  },
  argTypes: {
    size: {
      control: "select",
      options: DOT_CANVAS_SIZES,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DemoDotCanvas {...args} />,
};
