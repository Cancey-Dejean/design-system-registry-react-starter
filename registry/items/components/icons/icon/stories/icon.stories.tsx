import type { Meta, StoryObj } from "@storybook/react-vite";

import { ICONS } from "../../";
import { IconGallery } from "../../icon-gallery";
import Icon from "../icon";
import { ICON_SIZES } from "../icon.variants";

const meta: Meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  args: {
    icon: "aperture",
    size: "lg",
  },
  argTypes: {
    icon: {
      description: "The icon to display",
      control: { type: "select" },
      options: Object.keys(ICONS),
    },
    size: {
      description: "The size of the icon",
      control: { type: "select" },
      options: ICON_SIZES,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllIcons: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="mx-auto w-full max-w-6xl p-8">
      <IconGallery />
    </div>
  ),
};
