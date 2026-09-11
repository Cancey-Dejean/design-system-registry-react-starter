import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconFileCode,
  IconFileSpreadsheet,
  IconFileText,
  IconFileZip,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";

import StoryWrapper from "@registry/lib/story-wrapper";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "../attachment";

const meta: Meta<typeof Attachment> = {
  title: "Components/Attachment",
  component: Attachment,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Displays a file or image attachment with media, metadata, upload state, and actions. See https://ui.shadcn.com/docs/components/base/attachment",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "uploading", "processing", "error", "done"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function RemoveAction({ name }: { name: string }) {
  return (
    <AttachmentActions>
      <AttachmentAction aria-label={`Remove ${name}`}>
        <IconX />
      </AttachmentAction>
    </AttachmentActions>
  );
}

export const Default: Story = {
  args: {
    state: "done",
    size: "default",
    orientation: "horizontal",
  },
  render: (args) => (
    <Attachment {...args}>
      <AttachmentMedia>
        <IconFileText />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <RemoveAction name="sales-dashboard.pdf" />
    </Attachment>
  ),
};

export const Image: Story = {
  render: () => (
    <Attachment orientation="vertical">
      <AttachmentMedia variant="image">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80"
          alt="Mountain landscape by Drew Beamer"
        />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>workspace.png</AttachmentTitle>
        <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
      </AttachmentContent>
      <RemoveAction name="workspace.png" />
    </Attachment>
  ),
};

export const States: Story = {
  name: "Upload states",
  render: () => (
    <>
      <Attachment state="idle">
        <AttachmentMedia>
          <IconFileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>selected-file.pdf</AttachmentTitle>
          <AttachmentDescription>Ready to upload</AttachmentDescription>
        </AttachmentContent>
        <RemoveAction name="selected-file.pdf" />
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <IconFileZip />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>design-system.zip</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <RemoveAction name="design-system.zip" />
      </Attachment>
      <Attachment state="processing">
        <AttachmentMedia>
          <IconFileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>market-research.pdf</AttachmentTitle>
          <AttachmentDescription>Processing document</AttachmentDescription>
        </AttachmentContent>
        <RemoveAction name="market-research.pdf" />
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <IconFileSpreadsheet />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
          <AttachmentDescription>
            Upload failed. Try again.
          </AttachmentDescription>
        </AttachmentContent>
        <RemoveAction name="financial-model.xlsx" />
      </Attachment>
      <Attachment state="done">
        <AttachmentMedia>
          <IconFileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
          <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
        </AttachmentContent>
        <RemoveAction name="uploaded-report.pdf" />
      </Attachment>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      {(["default", "sm", "xs"] as const).map((size) => (
        <Attachment key={size} size={size}>
          <AttachmentMedia>
            <IconFileText />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>
              {size === "default"
                ? "Default"
                : size === "sm"
                  ? "Small"
                  : "Extra small"}{" "}
              attachment
            </AttachmentTitle>
            {size !== "xs" ? (
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            ) : null}
          </AttachmentContent>
          <RemoveAction name={`${size} attachment`} />
        </Attachment>
      ))}
    </>
  ),
};

export const Group: Story = {
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  render: () => (
    <AttachmentGroup role="group" aria-label="File attachments" tabIndex={0}>
      <Attachment>
        <AttachmentMedia>
          <IconFileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>briefing-notes.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 1.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment>
        <AttachmentMedia variant="image">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=200&dpr=2&q=80"
            alt="Mountain landscape by Drew Beamer"
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>workspace.png</AttachmentTitle>
          <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment>
        <AttachmentMedia>
          <IconFileSpreadsheet />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>customers.csv</AttachmentTitle>
          <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment>
        <AttachmentMedia>
          <IconFileCode />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>renderer.tsx</AttachmentTitle>
          <AttachmentDescription>TSX · 12 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  ),
};

export const WithTrigger: Story = {
  name: "With trigger",
  render: () => (
    <Attachment>
      <AttachmentMedia>
        <IconPhoto />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>research-summary.pdf</AttachmentTitle>
        <AttachmentDescription>
          Click card to open · PDF · 920 KB
        </AttachmentDescription>
      </AttachmentContent>
      <RemoveAction name="research-summary.pdf" />
      <AttachmentTrigger
        render={
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Open research-summary.pdf"
          />
        }
      />
    </Attachment>
  ),
};

export const HorizontalImages: Story = {
  name: "Image variants",
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(
        [
          ["workspace.png", "PNG · 820 KB"],
          ["desk-reference.jpg", "JPG · 1.1 MB"],
          ["office-reference.jpg", "JPG · 940 KB"],
        ] as const
      ).map(([title, description]) => (
        <Attachment key={title} orientation="vertical">
          <AttachmentMedia variant="image">
            <img
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80"
              alt="Mountain landscape by Drew Beamer"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{title}</AttachmentTitle>
            <AttachmentDescription>{description}</AttachmentDescription>
          </AttachmentContent>
          <RemoveAction name={title} />
        </Attachment>
      ))}
    </div>
  ),
};
