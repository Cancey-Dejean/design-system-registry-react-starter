import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconCopy,
  IconClipboard,
  IconScissors,
  IconTrash,
  IconArchive,
  IconShare,
} from "@tabler/icons-react";
import { useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../context-menu";

const meta = {
  title: "Components/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays a menu of actions triggered by a right click. Built on Base UI Context Menu. See https://ui.shadcn.com/docs/components/base/context-menu",
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
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj;

function TriggerSurface({ children }: { children?: React.ReactNode }) {
  return (
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
      {children ?? "Right click here"}
    </ContextMenuTrigger>
  );
}

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <TriggerSurface />
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Shortcuts: Story = {
  render: () => (
    <ContextMenu>
      <TriggerSurface />
      <ContextMenuContent>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Submenu: Story = {
  render: () => (
    <ContextMenu>
      <TriggerSurface />
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          <IconCopy />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <IconClipboard />
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>Save page as…</ContextMenuItem>
            <ContextMenuItem>Create shortcut…</ContextMenuItem>
            <ContextMenuItem>Name window…</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

function CheckboxesDemo() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);

  return (
    <ContextMenu>
      <TriggerSurface />
      <ContextMenuContent className="w-52">
        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={(checked) => setShowBookmarks(checked)}
        >
          Show Bookmarks Bar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showFullUrls}
          onCheckedChange={(checked) => setShowFullUrls(checked)}
        >
          Show Full URLs
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const Checkboxes: Story = {
  render: () => <CheckboxesDemo />,
};

function RadioDemo() {
  const [person, setPerson] = useState("pedro");

  return (
    <ContextMenu>
      <TriggerSurface />
      <ContextMenuContent className="w-52">
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const Radio: Story = {
  render: () => <RadioDemo />,
};

export const Groups: Story = {
  render: () => (
    <ContextMenu>
      <TriggerSurface />
      <ContextMenuContent className="w-52">
        <ContextMenuGroup>
          <ContextMenuLabel>File</ContextMenuLabel>
          <ContextMenuItem>
            <IconCopy />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <IconScissors />
            Cut
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Share</ContextMenuLabel>
          <ContextMenuItem>
            <IconShare />
            Share…
          </ContextMenuItem>
          <ContextMenuItem>
            <IconArchive />
            Archive
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ContextMenu>
      <TriggerSurface />
      <ContextMenuContent className="w-48">
        <ContextMenuItem>
          <IconShare />
          Share
        </ContextMenuItem>
        <ContextMenuItem>
          <IconArchive />
          Archive
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <IconTrash />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
