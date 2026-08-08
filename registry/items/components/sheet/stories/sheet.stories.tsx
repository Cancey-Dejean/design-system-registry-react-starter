import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StoryWrapper from "@/components/ui/story-wrapper";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Extends the Dialog component to display content that complements the main content of the screen. See https://ui.shadcn.com/docs/components/base/sheet",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full items-center justify-center">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 px-4">
          <div className="grid gap-2">
            <label htmlFor="sheet-name" className="text-sm font-medium">
              Name
            </label>
            <Input id="sheet-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="sheet-username" className="text-sm font-medium">
              Username
            </label>
            <Input id="sheet-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const SideLeft: Story = {
  name: "Side left",
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open left</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Links and structure for this section.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-2 px-4 text-sm">
          <a href="#overview" className="hover:underline">
            Overview
          </a>
          <a href="#analytics" className="hover:underline">
            Analytics
          </a>
          <a href="#reports" className="hover:underline">
            Reports
          </a>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const SideTop: Story = {
  name: "Side top",
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open top</SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Announcement</SheetTitle>
          <SheetDescription>A short banner sheet from the top edge.</SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          Scheduled maintenance tonight at 11pm UTC.
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const SideBottom: Story = {
  name: "Side bottom",
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open bottom</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Share</SheetTitle>
          <SheetDescription>Choose how you want to share this item.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button>Copy link</Button>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const WithoutCloseButton: Story = {
  name: "Without close button",
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Confirm action</SheetTitle>
          <SheetDescription>Use the footer buttons to dismiss this sheet.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
          <SheetClose render={<Button />}>Continue</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open controlled
      </Button>
      <p className="text-sm text-muted-foreground">Open: {String(open)}</p>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Controlled sheet</SheetTitle>
            <SheetDescription>Open state is managed by the parent.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
