import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconTerminal,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@registry/lib/story-wrapper";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "../alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays a callout for user attention. See https://ui.shadcn.com/docs/components/base/alert",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-lg flex-col gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args}>
      <IconTerminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Alert {...args}>
      <IconAlertTriangle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again to continue.
      </AlertDescription>
    </Alert>
  ),
};

export const WithAction: Story = {
  name: "With Action",
  render: () => (
    <Alert>
      <IconInfoCircle />
      <AlertTitle>New version available</AlertTitle>
      <AlertDescription>
        Update now to get the latest features and fixes.
      </AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </AlertAction>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert className="border-emerald-500/30 text-emerald-700 *:data-[slot=alert-description]:text-emerald-700/90 dark:text-emerald-400 dark:*:data-[slot=alert-description]:text-emerald-400/90 *:[svg]:text-current">
      <IconCircleCheck />
      <AlertTitle>Payment successful</AlertTitle>
      <AlertDescription>
        Your subscription has been renewed for another year.
      </AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  name: "Title only",
  render: () => (
    <Alert>
      <IconTerminal />
      <AlertTitle>Build completed successfully.</AlertTitle>
    </Alert>
  ),
};

export const DescriptionOnly: Story = {
  name: "Description only",
  render: () => (
    <Alert>
      <AlertDescription>
        This is a simple alert without a title or leading icon.
      </AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  name: "All variants",
  render: () => (
    <>
      <Alert>
        <IconInfoCircle />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>
          Neutral callout for general information.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <IconAlertTriangle />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>
          Used for errors that need immediate attention.
        </AlertDescription>
      </Alert>
    </>
  ),
};
