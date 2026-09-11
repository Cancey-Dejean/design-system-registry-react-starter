import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";

import StoryWrapper from "@registry/lib/story-wrapper";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A vertically stacked set of interactive headings that each reveal a section of content. Built on Base UI Accordion. See https://ui.shadcn.com/docs/components/base/accordion",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-lg">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Whether multiple items can be open at the same time",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content:
      "Yes. It adheres to the WAI-ARIA design pattern and is built on Base UI primitives.",
  },
  {
    value: "item-2",
    trigger: "Is it styled?",
    content:
      "Yes. It comes with default styles that match the other components in your design system.",
  },
  {
    value: "item-3",
    trigger: "Is it animated?",
    content:
      "Yes. Height is animated with accordion open and close transitions.",
  },
] as const;

function FaqAccordion(props: ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export const Default: Story = {
  args: {
    defaultValue: ["item-1"],
  },
  render: (args) => <FaqAccordion {...args} />,
};

export const Multiple: Story = {
  name: "Multiple open",
  args: {
    multiple: true,
    defaultValue: ["item-1", "item-2"],
  },
  render: (args) => <FaqAccordion {...args} />,
};

export const Collapsed: Story = {
  name: "All collapsed",
  args: {
    defaultValue: [],
  },
  render: (args) => <FaqAccordion {...args} />,
};

export const Disabled: Story = {
  args: {
    defaultValue: ["item-1"],
    disabled: true,
  },
  render: (args) => <FaqAccordion {...args} />,
};

export const DisabledItem: Story = {
  name: "Disabled item",
  render: () => (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Available section</AccordionTrigger>
        <AccordionContent>
          This item can be expanded and collapsed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled section</AccordionTrigger>
        <AccordionContent>This content is not reachable.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another section</AccordionTrigger>
        <AccordionContent>
          Use disabled on AccordionItem to lock a single panel.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const LongContent: Story = {
  name: "Long content",
  render: () => (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is included?</AccordionTrigger>
        <AccordionContent>
          <p>
            The accordion ships as an installable registry:ui item with trigger,
            content, and item slots you can compose freely.
          </p>
          <p>
            Animation uses the same open/close transitions as the rest of the
            Base UI styled components in this starter, so panel height eases in
            and out cleanly.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I customize the icons?</AccordionTrigger>
        <AccordionContent>
          Yes. Edit the chevron icons in the accordion trigger implementation,
          or wrap the trigger and supply your own indicator.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
