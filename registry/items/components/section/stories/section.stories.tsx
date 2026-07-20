import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import Section from "../section";
import { SECTION_PADDINGS } from "../section.variants";
import { DemoSection } from "./demo-section";

const meta: Meta = {
  title: "Components/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="p-10">
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    padding: "md",
  },
  argTypes: {
    padding: {
      control: "select",
      options: SECTION_PADDINGS,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DemoSection {...args} />,
};
