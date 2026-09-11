import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@registry/lib/story-wrapper";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../resizable";

const panelClass = "flex h-full items-center justify-center p-6";

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Accessible resizable panel groups and layouts with keyboard support. See https://ui.shadcn.com/docs/components/base/resizable",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-2xl">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className={panelClass}>
          <span className="text-sm font-medium">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className={panelClass}>
          <span className="text-sm font-medium">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[320px] rounded-lg border"
    >
      <ResizablePanel defaultSize={40}>
        <div className={panelClass}>
          <span className="text-sm font-medium">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className={panelClass}>
          <span className="text-sm font-medium">Body</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  name: "Three panels",
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className={panelClass}>
          <span className="text-sm font-medium">Left</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className={panelClass}>
          <span className="text-sm font-medium">Center</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className={panelClass}>
          <span className="text-sm font-medium">Right</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[320px] rounded-lg border"
    >
      <ResizablePanel defaultSize={30} minSize={20}>
        <div className={panelClass}>
          <span className="text-sm font-medium">Nav</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={35}>
            <div className={panelClass}>
              <span className="text-sm font-medium">Top</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={65}>
            <div className={panelClass}>
              <span className="text-sm font-medium">Main</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithoutHandle: Story = {
  name: "Without handle grip",
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel defaultSize={40}>
        <div className={panelClass}>
          <span className="text-sm font-medium">A</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <div className={panelClass}>
          <span className="text-sm font-medium">B</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
