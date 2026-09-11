import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconCalculator,
  IconCalendar,
  IconMoodSmile,
  IconSettings,
  IconUser,
  IconCreditCard,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@registry/lib/story-wrapper";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../command";

const meta = {
  title: "Components/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Command menu for search and quick actions. Built on cmdk. See https://ui.shadcn.com/docs/components/base/command",
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
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <IconCalendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <IconMoodSmile />
            Search Emoji
          </CommandItem>
          <CommandItem>
            <IconCalculator />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <IconUser />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconCreditCard />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Shortcuts: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search shortcuts..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            New file
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Open
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Save
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem disabled>
            Export
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Scrollable: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search letters..." />
      <CommandList className="max-h-48">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Letters">
          {Array.from({ length: 26 }, (_, index) => {
            const letter = String.fromCharCode(65 + index);
            return (
              <CommandItem key={letter} value={letter}>
                Letter {letter}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

function DialogDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
        <CommandShortcut className="ml-2">⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>
                <IconCalendar />
                Calendar
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <IconMoodSmile />
                Search Emoji
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <IconCalculator />
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                <IconUser />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <IconSettings />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export const DialogComposition: Story = {
  name: "Dialog palette",
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-sm items-center justify-center">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  render: () => <DialogDemo />,
};
