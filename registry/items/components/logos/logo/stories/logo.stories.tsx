import type { Meta, StoryObj } from "@storybook/react-vite";

import { LOGOS } from "../../";
import { LogoGallery } from "../../logo-gallery";
import Logo from "../logo";
import { LOGO_SIZES } from "../logo.variants";

const meta: Meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  args: {
    logo: "three-portals",
    size: "lg",
  },
  argTypes: {
    logo: {
      description: "The logo to display",
      control: { type: "select" },
      options: Object.keys(LOGOS),
    },
    size: {
      description: "The size of the logo",
      control: { type: "select" },
      options: LOGO_SIZES,
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllLogos: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="mx-auto w-full max-w-6xl p-8">
      <LogoGallery />
    </div>
  ),
};
