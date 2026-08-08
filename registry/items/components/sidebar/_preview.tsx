"use client";

import { IconChartBar, IconFolder, IconHome, IconSettings, IconUsers } from "@tabler/icons-react";

import { TooltipProvider } from "@/components/ui/tooltip";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./sidebar";

const nav = [
  { title: "Home", icon: IconHome, isActive: true },
  { title: "Projects", icon: IconFolder },
  { title: "Team", icon: IconUsers },
  { title: "Analytics", icon: IconChartBar },
  { title: "Settings", icon: IconSettings },
];

export function Preview() {
  return (
    <TooltipProvider>
      <SidebarProvider className="min-h-[360px] w-full max-w-3xl overflow-hidden rounded-xl border">
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">Acme</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.map((item) => (
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
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Dashboard</span>
          </header>
          <div className="flex flex-1 flex-col gap-2 p-4 text-sm text-muted-foreground">
            <p>Toggle the sidebar with the trigger or Ctrl/Cmd+B.</p>
            <p>Collapse to icons to see rail tooltips.</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
