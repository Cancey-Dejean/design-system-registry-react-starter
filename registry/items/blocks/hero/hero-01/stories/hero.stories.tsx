import type { Meta, StoryObj } from "@storybook/react-vite";

import Hero from "..";

const meta: Meta<typeof Hero> = {
  title: "Blocks/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Block: Story = {
  render: (args) => <Hero {...args} />,
};
