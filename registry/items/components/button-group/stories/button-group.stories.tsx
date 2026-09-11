import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconPlus, IconSearch } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@registry/lib/story-wrapper";

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "../button-group";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A container that groups related buttons with shared borders and orientation. See https://ui.shadcn.com/docs/components/base/button-group",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="p-6">
        <Story />
      </StoryWrapper>
    ),
  ],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Paste</Button>
      <Button variant="outline">Cut</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <Button variant="outline">Snooze</Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  name: "With separator",
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Snooze</Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  name: "With text",
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>https://</ButtonGroupText>
      <Button variant="outline">example.com</Button>
      <ButtonGroupText>.com</ButtonGroupText>
    </ButtonGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">
          <IconPlus data-icon="inline-start" />
          New
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">
          <IconSearch data-icon="inline-start" />
          Search
        </Button>
        <Button variant="outline">Filters</Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="sm" variant="outline">
          Group
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Group</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button size="lg" variant="outline">
          Group
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const Split: Story = {
  name: "Split actions",
  render: () => (
    <ButtonGroup>
      <Button>Save</Button>
      <Button size="icon" aria-label="More save options">
        <IconPlus />
      </Button>
    </ButtonGroup>
  ),
};
