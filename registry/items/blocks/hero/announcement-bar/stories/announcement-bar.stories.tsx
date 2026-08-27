import { Container } from "@registry/components/container/container";
import type { Meta, StoryObj } from "@storybook/react-vite";

import AnnouncementBar, { AnnouncementBarSlider } from "../announcement-bar";
import { ANNOUNCEMENT_BAR_THEMES } from "../announcement-bar.variants";
import { sliderItems } from "./announcement-bar.data";

const meta: Meta<typeof AnnouncementBar> = {
  title: "Blocks/Announcement Bar",
  component: AnnouncementBar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: "This is an announcement bar.",
  },
  argTypes: {
    theme: {
      description: "The theme of the announcement bar",
      control: "select",
      options: ANNOUNCEMENT_BAR_THEMES,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent = "This is an announcement bar.";

export const Default: Story = {
  args: {
    theme: "gray",
  },
  render: (args) => (
    <AnnouncementBar className="text-center" {...args}>
      <Container>
        <p className="text-14">{args.children || defaultContent}</p>
      </Container>
    </AnnouncementBar>
  ),
};

export const Themes: Story = {
  argTypes: {
    theme: { table: { disable: true } },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      {ANNOUNCEMENT_BAR_THEMES.map((theme) => (
        <AnnouncementBar className="text-center" key={theme} {...args} theme={theme}>
          <Container>
            <p className="text-14">{args.children || defaultContent}</p>
          </Container>
        </AnnouncementBar>
      ))}
    </div>
  ),
};

export const Slider: Story = {
  args: {
    theme: "gray",
  },
  render: (args) => <AnnouncementBarSlider theme={args.theme}>{sliderItems}</AnnouncementBarSlider>,
};
