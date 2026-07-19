import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import Section from "../section";
import { SECTION_PADDINGS } from "../section.variants";

const meta: Meta = {
  title: "Components/Section",
  component: Section,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    padding: "base",
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
  render: (args) => (
    <Section
      className="flex h-30 items-center justify-center gap-1 rounded-2xl border border-dashed border-red-500/40 bg-red-500/20 text-white capitalize"
      {...args}
    >
      Container Padding: <strong>{args.padding}</strong>
    </Section>
  ),
};
