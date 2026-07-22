import type { Meta, StoryObj } from "@storybook/react-vite";

import { LogoGallery } from "../logo-gallery";

const meta: Meta = {
  title: "Components/Logos",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

export const Logos: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-6xl p-8">
      <LogoGallery />
    </div>
  ),
};
