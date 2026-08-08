import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconFolder, IconHome, IconSettings } from "@tabler/icons-react";
import { useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time. See https://ui.shadcn.com/docs/components/base/tabs",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="rounded-lg border p-4 text-muted-foreground">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="rounded-lg border p-4 text-muted-foreground">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-4 text-muted-foreground">
        Project overview and status.
      </TabsContent>
      <TabsContent value="analytics" className="pt-4 text-muted-foreground">
        Traffic and engagement metrics.
      </TabsContent>
      <TabsContent value="reports" className="pt-4 text-muted-foreground">
        Generated reports and exports.
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="home" orientation="vertical" className="w-full flex-row">
      <TabsList>
        <TabsTrigger value="home">
          <IconHome data-icon="inline-start" />
          Home
        </TabsTrigger>
        <TabsTrigger value="projects">
          <IconFolder data-icon="inline-start" />
          Projects
        </TabsTrigger>
        <TabsTrigger value="settings">
          <IconSettings data-icon="inline-start" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home" className="rounded-lg border p-4 text-muted-foreground">
        Welcome home.
      </TabsContent>
      <TabsContent value="projects" className="rounded-lg border p-4 text-muted-foreground">
        Your recent projects.
      </TabsContent>
      <TabsContent value="settings" className="rounded-lg border p-4 text-muted-foreground">
        Preferences and configuration.
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  name: "Disabled tab",
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="rounded-lg border p-4 text-muted-foreground">
        This tab is available.
      </TabsContent>
      <TabsContent value="other" className="rounded-lg border p-4 text-muted-foreground">
        Another available panel.
      </TabsContent>
    </Tabs>
  ),
};

function ControlledDemo() {
  const [value, setValue] = useState("account");

  return (
    <div className="grid gap-3">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="rounded-lg border p-4 text-muted-foreground">
          Account panel.
        </TabsContent>
        <TabsContent value="password" className="rounded-lg border p-4 text-muted-foreground">
          Password panel.
        </TabsContent>
      </Tabs>
      <p className="text-sm text-muted-foreground">
        Active: <span className="font-mono text-foreground">{value}</span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
