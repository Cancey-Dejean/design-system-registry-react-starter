import { Spinner } from "@registry/components/spinner/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Mail, ShoppingCart } from "lucide-react";
import { fn } from "storybook/test";
import { Button, ButtonCTAGroup } from "../button";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "../button.variants";
import StoryWrapper from "@registry/lib/story-wrapper";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    backgrounds: { value: "dark" },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="p-4">
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    as: "button",
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
    onClick: { table: { disable: true } },
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
        {BUTTON_VARIANTS.map((variant) => (
          <Button key={variant} {...args} variant={variant}>
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
        {BUTTON_VARIANTS.map((variant) => (
          <Button key={variant} {...args} variant={variant}>
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
        {BUTTON_VARIANTS.map((variant) => (
          <Button
            key={variant}
            {...args}
            variant={variant}
            aria-label={loading ? "Loading" : undefined}
          >
            {loading ? (
              <Spinner className="size-6" />
            ) : (
              <span>{children || "Button"}</span>
            )}
          </Button>
        ))}
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
  render: (args) => (
    <ButtonCTAGroup>
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} />
      ))}
    </ButtonCTAGroup>
  ),
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
        <Button key={variant} {...args} variant={variant} />
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
    fullWidth: { table: { disable: true } },
    as: { table: { disable: true } },
    variant: { control: false },
    size: {
      description: "The size of the button",
      control: "select",
      options: BUTTON_SIZES.filter((size) => size.startsWith("icon")),
    },
  },

  render: (args) => (
    <ButtonCTAGroup>
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          <ShoppingCart />
        </Button>
      ))}
    </ButtonCTAGroup>
  ),
};
