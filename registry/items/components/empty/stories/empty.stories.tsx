import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCloud, IconFolder, IconSearch } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@/components/ui/story-wrapper";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../empty";

const meta = {
  title: "Components/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Display an empty state for blank lists, search misses, and first-run screens. See https://ui.shadcn.com/docs/components/base/empty",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-lg items-center justify-center">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolder />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Get started by creating a new project.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Create project</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithoutMedia: Story = {
  name: "Without media",
  render: () => (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          Try adjusting your filters or search to find what you need.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const Search: Story = {
  render: () => (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconSearch />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          No results for <span className="font-medium text-foreground">“design system”</span>. Try a
          different query.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Clear search
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithLink: Story = {
  name: "With description link",
  render: () => (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCloud />
        </EmptyMedia>
        <EmptyTitle>Cloud storage empty</EmptyTitle>
        <EmptyDescription>
          Upload files or learn more in the{" "}
          <a href="https://ui.shadcn.com/docs/components/base/empty">docs</a>.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm">Upload</Button>
          <Button size="sm" variant="outline">
            Browse templates
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
};

export const OutlineOnly: Story = {
  name: "Dashed container only",
  render: () => (
    <Empty className="min-h-48 border border-dashed">
      <EmptyHeader>
        <EmptyTitle>Nothing here</EmptyTitle>
        <EmptyDescription>This slot is empty.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};
