import { TooltipProvider } from "@registry/components/tooltip/tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconChartBar,
  IconFolder,
  IconHome,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "../sidebar";

const primaryNav = [
  { title: "Home", icon: IconHome, isActive: true },
  { title: "Projects", icon: IconFolder },
  { title: "Team", icon: IconUsers },
  { title: "Analytics", icon: IconChartBar },
  { title: "Settings", icon: IconSettings },
];

function AppSidebar({
  collapsible = "icon",
  variant = "sidebar",
  side = "left",
}: {
  collapsible?: "offcanvas" | "icon" | "none";
  variant?: "sidebar" | "floating" | "inset";
  side?: "left" | "right";
}) {
  return (
    <Sidebar collapsible={collapsible} variant={variant} side={side}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold">Acme Inc</div>
        <SidebarInput placeholder="Search…" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.isActive} tooltip={item.title}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <IconSearch />
                  <span>Documentation</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isActive>Getting started</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>API</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>Changelog</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <IconUsers />
              <span>Account</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      {collapsible !== "none" ? <SidebarRail /> : null}
    </Sidebar>
  );
}

function Shell({
  collapsible,
  variant,
  side,
  children,
}: {
  collapsible?: "offcanvas" | "icon" | "none";
  variant?: "sidebar" | "floating" | "inset";
  side?: "left" | "right";
  children?: ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider className="min-h-[480px] w-full overflow-hidden rounded-xl border">
        <AppSidebar collapsible={collapsible} variant={variant} side={side} />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Dashboard</span>
          </header>
          <div className="flex flex-1 flex-col gap-2 p-4 text-sm text-muted-foreground">
            {children ?? (
              <>
                <p>Main content sits in `SidebarInset`.</p>
                <p>Use the trigger or Ctrl/Cmd+B to toggle.</p>
              </>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A composable, themeable, and customizable sidebar. See https://ui.shadcn.com/docs/components/base/sidebar",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full items-stretch p-6">
        <div className="w-full max-w-5xl">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Shell collapsible="icon" />,
};

export const Offcanvas: Story = {
  render: () => (
    <Shell collapsible="offcanvas">
      <p>Offcanvas fully hides the sidebar when collapsed.</p>
    </Shell>
  ),
};

export const NonCollapsible: Story = {
  name: "Non collapsible",
  render: () => (
    <Shell collapsible="none">
      <p>The sidebar stays fixed at full width.</p>
    </Shell>
  ),
};

export const Floating: Story = {
  render: () => (
    <Shell collapsible="icon" variant="floating">
      <p>Floating variant adds padding, radius, and a subtle ring.</p>
    </Shell>
  ),
};

export const Inset: Story = {
  render: () => (
    <Shell collapsible="icon" variant="inset">
      <p>Inset variant nests the content panel with margin and radius on desktop.</p>
    </Shell>
  ),
};

export const RightSide: Story = {
  name: "Right side",
  render: () => (
    <Shell collapsible="icon" side="right">
      <p>Sidebar anchored to the right edge.</p>
    </Shell>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <TooltipProvider>
      <SidebarProvider className="min-h-[320px] w-full overflow-hidden rounded-xl border">
        <Sidebar collapsible="none">
          <SidebarHeader>
            <div className="px-2 py-1.5 text-sm font-semibold">Loading</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Recently</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Array.from({ length: 5 }, (_, index) => (
                    <SidebarMenuItem key={`skeleton-${index + 1}`}>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 text-sm text-muted-foreground">Menu skeleton placeholders.</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  ),
};
