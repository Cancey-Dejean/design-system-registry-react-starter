import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@registry/lib/story-wrapper";

import { ScrollArea } from "../scroll-area";

const tags = Array.from({ length: 50 }).map(
  (_, index) => `v1.2.0-beta.${index + 1}`,
);

const works = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

const longParagraphs = [
  "Scroll areas style the scrollbar while keeping native scrolling behavior on the viewport.",
  "Constrain height or width so overflow appears and the thumbs become interactive.",
  "Vertical and horizontal scrollbars are both mounted by default on the root.",
  "Use this pattern for long docs, log streams, and dense side navigation lists.",
  "Focus the viewport to navigate with the keyboard when overflow is present.",
  "Thumb appearance follows the border token so it stays quiet in most themes.",
  "Corner region fills the intersection when both axes overflow at once.",
  "Prefer short captions and semantic lists inside the scroll viewport.",
  "Storybook demos keep content small enough to check both axes quickly.",
  "Larger catalogs can reuse the same shell without changing the primitive.",
  "Combine with cards or tables when a pane must stay within a fixed layout.",
  "Keep labels outside the scrollbox so section headers remain available.",
];

const meta = {
  title: "Components/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Augments native scroll functionality for custom, cross-browser styling. See https://ui.shadcn.com/docs/components/base/scroll-area",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full justify-center">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {works.map((work) => (
          <figure key={work.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={work.art}
                alt={work.artist}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="text-muted-foreground pt-2 text-xs">
              Photo by{" "}
              <span className="text-foreground font-semibold">
                {work.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const LongContent: Story = {
  name: "Long content",
  render: () => (
    <ScrollArea className="h-64 w-full max-w-md rounded-md border">
      <div className="space-y-3 p-4 text-sm leading-relaxed">
        {longParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </ScrollArea>
  ),
};
