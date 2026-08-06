import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconAlertTriangle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@/components/ui/story-wrapper";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/Alert Dialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A modal dialog that interrupts the user with important content and expects a response. Built on Base UI Alert Dialog. See https://ui.shadcn.com/docs/components/base/alert-dialog",
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>Show Dialog</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Small: Story = {
  name: "Small size",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>Delete project</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone. All files and settings will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithMedia: Story = {
  name: "With media",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>Review risk</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <IconAlertTriangle />
          </AlertDialogMedia>
          <AlertDialogTitle>This action is irreversible</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to archive this workspace. Collaborators will lose access immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep workspace</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Archive</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <IconTrash data-icon="inline-start" />
        Delete account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <IconTrash />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete account</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account and remove your data from our servers. Type
            carefully—this cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Yes, delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard draft?</AlertDialogTitle>
            <AlertDialogDescription>
              Your unsaved changes will be lost if you leave this page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
