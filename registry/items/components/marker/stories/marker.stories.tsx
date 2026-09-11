import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconInfoCircle, IconStar } from "@tabler/icons-react";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Marker, MarkerContent, MarkerIcon } from "../marker";

const meta = {
  title: "Components/Marker",
  component: Marker,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A marker for labeling sections with optional icons, borders, and separators. See https://ui.shadcn.com/docs/components/base/marker",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "separator", "border"],
    },
  },
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Marker>
      <MarkerIcon>
        <IconInfoCircle />
      </MarkerIcon>
      <MarkerContent>Optional section label</MarkerContent>
    </Marker>
  ),
};

export const WithoutIcon: Story = {
  name: "Without icon",
  render: () => (
    <Marker>
      <MarkerContent>Text-only marker for a quiet caption.</MarkerContent>
    </Marker>
  ),
};

export const Separator: Story = {
  render: () => (
    <Marker variant="separator">
      <MarkerContent>Or continue with</MarkerContent>
    </Marker>
  ),
};

export const Border: Story = {
  render: () => (
    <Marker variant="border">
      <MarkerIcon>
        <IconStar />
      </MarkerIcon>
      <MarkerContent>Featured section with a bottom edge.</MarkerContent>
    </Marker>
  ),
};

export const WithLink: Story = {
  name: "With link",
  render: () => (
    <Marker>
      <MarkerIcon>
        <IconInfoCircle />
      </MarkerIcon>
      <MarkerContent>
        Learn more in the{" "}
        <a href="https://ui.shadcn.com/docs/components/base/marker">docs</a>.
      </MarkerContent>
    </Marker>
  ),
};

export const AsHeading: Story = {
  name: "As heading",
  render: () => (
    // Marker children are projected into the rendered heading via useRender.
    // eslint-disable-next-line jsx-a11y/heading-has-content -- content is MarkerContent
    <Marker variant="border" render={<h3 />}>
      <MarkerContent className="text-foreground">Account</MarkerContent>
    </Marker>
  ),
};
