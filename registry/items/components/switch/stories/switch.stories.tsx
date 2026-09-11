import { Label } from "@registry/components/label/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Switch } from "../switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A control that allows the user to toggle between checked and not checked. See https://ui.shadcn.com/docs/components/base/switch",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="bluetooth" defaultChecked />
      <Label htmlFor="bluetooth">Bluetooth</Label>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="small" size="sm" defaultChecked />
      <Label htmlFor="small">Small switch</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <div className="flex items-center gap-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" className="opacity-70">
          Disabled off
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on" className="opacity-70">
          Disabled on
        </Label>
      </div>
    </>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Switch id="must-enable" aria-invalid />
        <Label htmlFor="must-enable">Enable notifications</Label>
      </div>
      <p className="text-destructive text-sm">This setting is required.</p>
    </div>
  ),
};

function ControlledDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Switch
          id="controlled"
          checked={checked}
          onCheckedChange={(value) => setChecked(value)}
        />
        <Label htmlFor="controlled">Controlled switch</Label>
      </div>
      <p className="text-muted-foreground text-sm">
        Checked: {checked ? "true" : "false"}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const SettingsList: Story = {
  name: "Settings list",
  render: () => (
    <div className="grid gap-4">
      {(
        [
          ["marketing", "Marketing emails", false],
          ["security", "Security alerts", true],
          ["product", "Product updates", true],
        ] as const
      ).map(([id, label, defaultChecked]) => (
        <div key={id} className="flex items-center justify-between gap-4">
          <Label htmlFor={id}>{label}</Label>
          <Switch id={id} defaultChecked={defaultChecked} />
        </div>
      ))}
    </div>
  ),
};
