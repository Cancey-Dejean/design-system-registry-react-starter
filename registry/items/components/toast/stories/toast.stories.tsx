import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@/components/ui/story-wrapper";

import { toast, Toaster } from "../toast";

const meta = {
  title: "Components/Toast",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A succinct message that is displayed temporarily. See https://ui.shadcn.com/docs/components/base/toast",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <Toaster>
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            <Story />
          </div>
        </Toaster>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Event created",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
    >
      Show Toast
    </Button>
  ),
};

export const Types: Story = {
  render: () => (
    <>
      {(
        [
          ["success", "Success", "Your changes have been saved."],
          ["info", "Info", "A new version is available."],
          ["warning", "Warning", "Your subscription ends soon."],
          ["error", "Error", "Something went wrong."],
          ["loading", "Loading", "Please wait…"],
        ] as const
      ).map(([type, title, description]) => (
        <Button
          key={type}
          variant="outline"
          onClick={() =>
            toast.add({
              type,
              title,
              description,
            })
          }
        >
          {title}
        </Button>
      ))}
    </>
  ),
};

export const WithAction: Story = {
  name: "With action",
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "File deleted",
          description: "design-system-kit.zip was moved to trash.",
          actionProps: {
            children: "Undo",
            onClick: () => {
              toast.add({
                type: "success",
                title: "Restored",
                description: "The file was restored from trash.",
              });
            },
          },
        })
      }
    >
      Delete file
    </Button>
  ),
};

export const PromiseToast: Story = {
  name: "Promise",
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        void toast.promise(
          new Promise<string>((resolve) => {
            window.setTimeout(() => resolve("ok"), 1500);
          }),
          {
            loading: "Uploading…",
            success: {
              title: "Upload complete",
              description: "Your file is ready.",
            },
            error: {
              title: "Upload failed",
              description: "Please try again.",
            },
          },
        );
      }}
    >
      Run promise
    </Button>
  ),
};

export const Stack: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast.add({ title: "First toast", description: "Stack me." });
        toast.add({ type: "info", title: "Second toast", description: "Hover to expand." });
        toast.add({ type: "success", title: "Third toast", description: "Still in the stack." });
      }}
    >
      Stack toasts
    </Button>
  ),
};
