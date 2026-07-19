import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";

import { Text } from "../text";
import { TEXT_SIZES, TEXT_ALIGNMENTS, TEXT_WEIGHTS, TEXT_TONES } from "../text.variants";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    size: "md",
    weight: "regular",
    tone: "default",
    align: "left",
  },
  argTypes: {
    size: {
      description: "The font size of the text",
      control: "select",
      options: TEXT_SIZES,
    },
    weight: {
      description: "The font weight of the text",
      control: "select",
      options: TEXT_WEIGHTS,
    },
    tone: {
      description: "The color tone of the text",
      control: "select",
      options: TEXT_TONES,
    },
    align: {
      description: "The text alignment",
      control: "select",
      options: TEXT_ALIGNMENTS,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "The quick brown fox jumps over the lazy dog. This is a sample paragraph to demonstrate the text component.",
  },
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {TEXT_SIZES.map((size) => (
        <Text key={size} {...args} size={size}>
          Size: {size} — The quick brown fox jumps over the lazy dog.
        </Text>
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
      {TEXT_WEIGHTS.map((weight) => (
        <Text key={weight} {...args} weight={weight}>
          Weight: {weight} — The quick brown fox jumps over the lazy dog.
        </Text>
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
      {TEXT_TONES.map((tone) => (
        <Text key={tone} {...args} tone={tone}>
          Tone: {tone} — The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
};

export const Alignments: Story = {
  argTypes: {
    align: { table: { disable: true } },
  },
  render: (args) => (
    <div className="flex w-full flex-col gap-4">
      {TEXT_ALIGNMENTS.map((align) => (
        <Text key={align} {...args}>
          Align: <strong>{align}</strong> — The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
};

export const AsSpan: Story = {
  args: {
    as: "span",
    children: "This renders as a span element.",
  },
};
