import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@/components/ui/story-wrapper";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An interactive component which expands/collapses a panel. Built on Base UI Collapsible. See https://ui.shadcn.com/docs/components/base/collapsible",
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
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Collapsible className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" className="size-8" />}>
          <IconChevronDown />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Open: Story = {
  name: "Default open",
  render: () => (
    <Collapsible defaultOpen className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold">Shipping details</h4>
        <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
          Toggle
          <IconChevronDown data-icon="inline-end" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
        Orders ship within 2 business days. Tracking is emailed when the parcel leaves the
        warehouse.
      </CollapsibleContent>
    </Collapsible>
  ),
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
          {open ? "Collapse" : "Expand"} from outside
        </Button>
        <span className="text-sm text-muted-foreground">open: {String(open)}</span>
      </div>
      <Collapsible open={open} onOpenChange={setOpen} className="space-y-2">
        <CollapsibleTrigger
          render={<Button variant="secondary" className="w-full justify-between" />}
        >
          Advanced options
          <IconChevronDown />
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
          Extra filters, export formats, and experimental flags live here.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const Simple: Story = {
  name: "Text trigger",
  render: () => (
    <Collapsible className="space-y-2">
      <CollapsibleTrigger className="text-sm font-medium underline-offset-4 hover:underline">
        Can I use this in my project?
      </CollapsibleTrigger>
      <CollapsibleContent className="text-sm text-muted-foreground">
        Yes. Free to use for personal and commercial projects. No attribution required.
      </CollapsibleContent>
    </Collapsible>
  ),
};
