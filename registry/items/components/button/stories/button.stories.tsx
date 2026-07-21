import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Mail, ShoppingCart } from "lucide-react";
import { fn } from "storybook/test";

import StoryWrapper from "@/components/ui/story-wrapper";
import { cn } from "@/lib/utils";

import { Spinner } from "../../spinner/spinner";
import { Button, ButtonCTAGroup } from "../button";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "../button.variants";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full">
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    variant: "primary",
    size: "md",
    onClick: fn(),
    fullWidth: false,
  },
  argTypes: {
    variant: {
      description: "The variant of the button",
      control: "select",
      options: BUTTON_VARIANTS,
    },
    size: {
      description: "The size of the button",
      control: "select",
      options: BUTTON_SIZES.filter((size) => !size.startsWith("icon")),
    },
    as: { control: false },
    icon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const LeadingIcon: Story = {
  args: {
    children: "Button",
  },
  argTypes: {
    onClick: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
    as: { table: { disable: true } },
    icon: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-6">
      <ButtonCTAGroup>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Button key={size} {...args} size={size}>
            <Mail />
            {args.children}
          </Button>
        ))}
      </ButtonCTAGroup>
    </div>
  ),
};

export const TrailingIcon: Story = {
  args: {
    children: "Button",
  },
  argTypes: {
    onClick: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
    as: { table: { disable: true } },
    icon: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-6">
      <ButtonCTAGroup>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Button key={size} {...args} size={size}>
            {args.children}
            <ArrowRight />
          </Button>
        ))}
      </ButtonCTAGroup>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: "Button",
    loading: true,
  },
  render: ({ children, loading, ...args }) => {
    return (
      <ButtonCTAGroup>
        <Button {...args}>
          {loading ? (
            <>
              <Spinner className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 animate-spin cursor-progress opacity-50" />

              <span className={cn(loading && "opacity-0")}>{children}</span>
            </>
          ) : (
            <span>{children || "Button"}</span>
          )}
        </Button>
      </ButtonCTAGroup>
    );
  },
};

export const Linkable: Story = {
  args: {
    as: "a",
    href: "#",
    children: "Link",
    fullWidth: false,
  },
};

export const Group: Story = {
  args: {
    children: "Button",
  },
  argTypes: {
    variant: { table: { disable: true } },
    onClick: { table: { disable: true } },
    fullWidth: { table: { disable: true } },
    as: { table: { disable: true } },
    icon: { table: { disable: true } },
  },
  render: (args) => (
    <ButtonCTAGroup>
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {args?.children || "Button"}
        </Button>
      ))}
    </ButtonCTAGroup>
  ),
};

export const Icon: Story = {
  args: {
    size: "icon-md",
    icon: true,
  },
  argTypes: {
    fullWidth: { control: false },
    size: {
      description: "The size of the button",
      control: "select",
      options: BUTTON_SIZES.filter((size) => size.startsWith("icon")),
    },
  },

  render: (args) => (
    <ButtonCTAGroup>
      <Button {...args}>
        <ShoppingCart />
      </Button>
    </ButtonCTAGroup>
  ),
};
