import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StoryWrapper from "@/components/ui/story-wrapper";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A window overlaid on either the primary window or another dialog window. Built on Base UI Dialog. See https://ui.shadcn.com/docs/components/base/dialog",
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
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutClose: Story = {
  name: "Without close button",
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Share link</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Share this page</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this page. Copy it from the field below.
          </DialogDescription>
        </DialogHeader>
        <Input readOnly defaultValue="https://ui.shadcn.com/docs/components/dialog" />
        <DialogFooter showCloseButton>
          <Button
            onClick={() => {
              void navigator.clipboard.writeText("https://ui.shadcn.com/docs/components/dialog");
            }}
          >
            Copy link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const StickyFooter: Story = {
  name: "Sticky footer",
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Sticky Footer</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content scrolls.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {[
            "scroll-1",
            "scroll-2",
            "scroll-3",
            "scroll-4",
            "scroll-5",
            "scroll-6",
            "scroll-7",
            "scroll-8",
            "scroll-9",
            "scroll-10",
          ].map((id) => (
            <p key={id} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const CustomWidth: Story = {
  name: "Custom width",
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Show details</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Project details</DialogTitle>
          <DialogDescription>
            Overview of the current sprint scope and owners. This panel uses a wider max width for
            denser content.
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
          <li>Ship calendar and dialog registry items</li>
          <li>Finish input group dependency wiring</li>
          <li>Document install paths for consumers</li>
        </ul>
        <DialogFooter>
          <DialogClose render={<Button />}>Done</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open controlled dialog
      </Button>
      <p className="text-sm text-muted-foreground">Open: {open ? "true" : "false"}</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogDescription>Open state is managed outside the dialog tree.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const Scrollable: Story = {
  name: "Scrollable content",
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Scrollable Content</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>This is a dialog with scrollable content.</DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {[
            "scroll-1",
            "scroll-2",
            "scroll-3",
            "scroll-4",
            "scroll-5",
            "scroll-6",
            "scroll-7",
            "scroll-8",
            "scroll-9",
            "scroll-10",
          ].map((id) => (
            <p key={id} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
};
