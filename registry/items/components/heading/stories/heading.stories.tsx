import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import Heading from "../heading";
import { HEADING_LEVELS, HEADING_SIZES, HEADING_WEIGHTS, HEADING_TONES } from "../heading.variants";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  component: Heading,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    level: "h2",
    weight: "semibold",
    tone: "default",
    size: "lg",
  },
  argTypes: {
    level: {
      description: "The semantic heading level (h1-h6)",
      control: "select",
      options: HEADING_LEVELS,
    },
    size: {
      description: "Override the visual size independently from level",
      control: "select",
      options: HEADING_SIZES,
    },
    weight: {
      description: "The font weight of the heading",
      control: "select",
      options: HEADING_WEIGHTS,
    },
    tone: {
      description: "The color tone of the heading",
      control: "select",
      options: HEADING_TONES,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Heading",
  },
};

export const Sizes: Story = {
  argTypes: {
    level: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {HEADING_SIZES.map((size) => (
        <Heading key={size} {...args} level="h2" size={size}>
          Size: {size}
        </Heading>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  argTypes: {
    weight: { table: { disable: true } },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {HEADING_WEIGHTS.map((weight) => (
        <Heading key={weight} {...args} weight={weight}>
          Weight: {weight}
        </Heading>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  argTypes: {
    tone: { table: { disable: true } },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {HEADING_TONES.map((tone) => (
        <Heading key={tone} {...args} tone={tone}>
          Tone: {tone}
        </Heading>
      ))}
    </div>
  ),
};
