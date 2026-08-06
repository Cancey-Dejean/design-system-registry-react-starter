import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@/components/ui/story-wrapper";
import { cn } from "@/lib/utils";

import {
  scrollFadeClass,
  scrollFadeEdgeClasses,
  scrollFadeNoneClass,
  scrollFadeSizeClasses,
  scrollFadeXClass,
  scrollFadeYClass,
} from "../scroll-fade";

const verticalItems = Array.from({ length: 14 }, (_, i) => `Item ${i + 1}`);
const shortItems = ["Item 1", "Item 2", "Item 3"];
const tags = [
  "Design",
  "Engineering",
  "Marketing",
  "Product",
  "Research",
  "Sales",
  "Support",
  "Operations",
  "Finance",
  "Legal",
  "People",
  "Security",
];
const tasks = [
  "Inbox triage",
  "Design review",
  "API contract",
  "QA pass",
  "Launch notes",
  "Metrics follow-up",
];

function ScrollFrame({
  className,
  items = verticalItems,
}: {
  className?: string;
  items?: string[];
}) {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border bg-background">
      <div className={cn(className, "max-h-44 px-4 py-1")}>
        <ul className="divide-y">
          {items.map((item) => (
            <li key={item} className="py-2.5 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Utilities/scroll-fade",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'CSS utilities for scroll-aware edge fades. Requires `@import "shadcn/tailwind.css"`. See https://ui.shadcn.com/docs/utils/scroll-fade',
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <Story />
      </StoryWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Vertical",
  render: () => <ScrollFrame className={scrollFadeClass} />,
};

export const NoOverflow: Story = {
  name: "No Overflow",
  render: () => <ScrollFrame className={scrollFadeClass} items={shortItems} />,
};

export const Horizontal: Story = {
  name: "Horizontal",
  render: () => (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border bg-background">
      <div className={cn(scrollFadeXClass, "flex gap-2 px-3 py-3")}>
        {tags.map((tag) => (
          <span
            key={tag}
            className="shrink-0 rounded-full border bg-muted px-3 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  ),
};

export const EdgeFades: Story = {
  name: "Edge Fades",
  render: () => (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
      {(
        [
          ["scroll-fade-t", scrollFadeEdgeClasses.top],
          ["scroll-fade-b", scrollFadeEdgeClasses.bottom],
          ["scroll-fade-s", scrollFadeEdgeClasses.start],
          ["scroll-fade-e", scrollFadeEdgeClasses.end],
        ] as const
      ).map(([label, className]) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="font-mono text-xs text-muted-foreground">{label}</span>
          {label.endsWith("-s") || label.endsWith("-e") ? (
            <div className="overflow-hidden rounded-2xl border bg-background">
              <div className={cn(className, "flex gap-2 px-3 py-3")}>
                {tags.slice(0, 8).map((tag) => (
                  <span
                    key={tag}
                    className="shrink-0 rounded-full border bg-muted px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <ScrollFrame className={className} items={tasks} />
          )}
        </div>
      ))}
    </div>
  ),
};

export const FadeSize: Story = {
  name: "Fade Size",
  render: () => (
    <div className="flex flex-col gap-6 sm:flex-row">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-muted-foreground">scroll-fade-4</span>
        <ScrollFrame className={cn(scrollFadeYClass, scrollFadeSizeClasses[4])} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-muted-foreground">scroll-fade-24</span>
        <ScrollFrame className={cn(scrollFadeYClass, scrollFadeSizeClasses[24])} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-6 sm:flex-row">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-muted-foreground">scroll-fade</span>
        <ScrollFrame className={scrollFadeClass} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-muted-foreground">scroll-fade-none</span>
        <ScrollFrame className={cn(scrollFadeClass, scrollFadeNoneClass)} />
      </div>
    </div>
  ),
};
