import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@/components/ui/story-wrapper";

import { DirectionProvider, useDirection, type TextDirection } from "../direction";

const meta = {
  title: "Components/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A provider that sets text direction (ltr or rtl) for Base UI components. See https://ui.shadcn.com/docs/components/base/direction",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-md flex-col items-start gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof DirectionProvider>;

export default meta;
type Story = StoryObj;

function DirectionReadout() {
  const direction = useDirection();

  return (
    <div
      dir={direction}
      className="w-full rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
    >
      <p className="text-base font-medium">
        {direction === "rtl" ? "تسجيل الدخول إلى حسابك" : "Login to your account"}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {direction === "rtl"
          ? "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك"
          : "Enter your email below to login to your account"}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        useDirection(): <span className="font-mono text-foreground">{direction}</span>
      </p>
    </div>
  );
}

function ToggleDemo() {
  const [direction, setDirection] = useState<TextDirection>("ltr");

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setDirection((current) => (current === "ltr" ? "rtl" : "ltr"))}
      >
        {direction === "ltr" ? "Switch to Arabic (RTL)" : "Switch to English (LTR)"}
      </Button>
      <DirectionProvider direction={direction}>
        <DirectionReadout />
      </DirectionProvider>
    </>
  );
}

export const Default: Story = {
  render: () => <ToggleDemo />,
};

export const LTR: Story = {
  name: "LTR",
  render: () => (
    <DirectionProvider direction="ltr">
      <DirectionReadout />
    </DirectionProvider>
  ),
};

export const RTL: Story = {
  name: "RTL",
  render: () => (
    <DirectionProvider direction="rtl">
      <DirectionReadout />
    </DirectionProvider>
  ),
};
