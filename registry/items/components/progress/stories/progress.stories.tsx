import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Progress, ProgressLabel, ProgressValue } from "../progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays an indicator showing the completion progress of a task. See https://ui.shadcn.com/docs/components/base/progress",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Progress value={60} />,
};

export const WithLabel: Story = {
  name: "With label",
  render: () => (
    <Progress value={45}>
      <ProgressLabel>Storage</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};

export const AlmostComplete: Story = {
  name: "Almost complete",
  render: () => (
    <Progress value={92}>
      <ProgressLabel>Export</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};

export const Empty: Story = {
  render: () => (
    <Progress value={0}>
      <ProgressLabel>Starting</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};

function AnimatedDemo() {
  const [value, setValue] = useState(13);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setValue((current) => (current >= 100 ? 0 : current + 7));
    }, 500);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <Progress value={value}>
      <ProgressLabel>Processing</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}

export const Animated: Story = {
  render: () => <AnimatedDemo />,
};
