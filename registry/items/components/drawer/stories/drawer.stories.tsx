import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StoryWrapper from "@/components/ui/story-wrapper";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A drawer that slides in from an edge of the screen. Built on Base UI Drawer. See https://ui.shadcn.com/docs/components/base/drawer",
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
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-3 p-4 pt-2">
          <div className="grid gap-2">
            <label htmlFor="goal" className="text-sm font-medium">
              Goal
            </label>
            <Input id="goal" type="number" defaultValue="350" />
          </div>
        </div>
        <DrawerFooter>
          <Button type="submit">Submit</Button>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithSwipeHandle: Story = {
  name: "Swipe handle",
  render: () => (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Open with handle</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Swipe to dismiss</DrawerTitle>
          <DrawerDescription>
            A handle at the edge signals that the drawer can be dragged closed.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-2 text-sm text-muted-foreground">
          Drag the handle downward to close on touch devices.
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const FromRight: Story = {
  name: "From right",
  render: () => (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button variant="outline" />}>Open from right</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Adjust filters and apply them to the list.</DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-3 p-4 pt-2">
          <div className="grid gap-2">
            <label htmlFor="filter" className="text-sm font-medium">
              Category
            </label>
            <Input id="filter" placeholder="Search…" />
          </div>
        </div>
        <DrawerFooter>
          <Button>Apply</Button>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const FromLeft: Story = {
  name: "From left",
  render: () => (
    <Drawer swipeDirection="left">
      <DrawerTrigger render={<Button variant="outline" />}>Open from left</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Quick links and secondary navigation.</DrawerDescription>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 p-4 pt-2">
          <Button variant="ghost" className="justify-start">
            Home
          </Button>
          <Button variant="ghost" className="justify-start">
            Projects
          </Button>
          <Button variant="ghost" className="justify-start">
            Settings
          </Button>
        </nav>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const FromTop: Story = {
  name: "From top",
  render: () => (
    <Drawer swipeDirection="up" showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Open from top</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>Recent activity in your workspace.</DrawerDescription>
        </DrawerHeader>
        <ul className="space-y-2 p-4 pt-2 text-sm">
          <li className="rounded-md border p-2">Design system update shipped</li>
          <li className="rounded-md border p-2">New comment on your PR</li>
          <li className="rounded-md border p-2">Invite accepted by teammate</li>
        </ul>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">Open: {open ? "true" : "false"}</p>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="outline" />}>Controlled drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Controlled open state</DrawerTitle>
            <DrawerDescription>The parent tracks open via open / onOpenChange.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Close programmatically</Button>
            <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
