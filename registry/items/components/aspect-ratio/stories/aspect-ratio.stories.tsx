import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@registry/lib/story-wrapper";

import { AspectRatio } from "../aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/Aspect Ratio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays content within a desired aspect ratio. See https://ui.shadcn.com/docs/components/base/aspect-ratio",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    ratio: {
      control: { type: "number", min: 0.25, max: 4, step: 0.05 },
      description: "Width divided by height (e.g. 16/9 ≈ 1.778)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = (
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Mountain landscape by Drew Beamer"
    className="size-full object-cover dark:brightness-50 dark:grayscale"
  />
);

export const Default: Story = {
  args: {
    ratio: 16 / 9,
    className: "overflow-hidden rounded-lg bg-muted",
  },
  render: (args) => <AspectRatio {...args}>{sampleImage}</AspectRatio>,
};

export const Square: Story = {
  args: {
    ratio: 1,
    className: "overflow-hidden rounded-lg bg-muted",
  },
  render: (args) => <AspectRatio {...args}>{sampleImage}</AspectRatio>,
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
    className: "overflow-hidden rounded-lg bg-muted",
  },
  render: (args) => <AspectRatio {...args}>{sampleImage}</AspectRatio>,
};

export const Cinema: Story = {
  name: "Cinema (21:9)",
  args: {
    ratio: 21 / 9,
    className: "overflow-hidden rounded-lg bg-muted",
  },
  render: (args) => <AspectRatio {...args}>{sampleImage}</AspectRatio>,
};

export const WithPlaceholder: Story = {
  name: "With placeholder",
  render: () => (
    <AspectRatio
      ratio={4 / 3}
      className="bg-muted/40 text-muted-foreground flex items-center justify-center overflow-hidden rounded-lg border border-dashed text-sm"
    >
      4 : 3
    </AspectRatio>
  ),
};

export const Ratios: Story = {
  name: "Common ratios",
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  render: () => (
    <>
      {(
        [
          ["16 / 9", 16 / 9],
          ["4 / 3", 4 / 3],
          ["1 / 1", 1],
          ["3 / 4", 3 / 4],
        ] as const
      ).map(([label, ratio]) => (
        <div key={label} className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <AspectRatio
            ratio={ratio}
            className="bg-muted overflow-hidden rounded-lg"
          >
            {sampleImage}
          </AspectRatio>
        </div>
      ))}
    </>
  ),
};
