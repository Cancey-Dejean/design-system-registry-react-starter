import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { siteConfig } from "../../lib/site-config";
import { DocsSidebarNav, useCloseMobileSidebar } from "./docs-sidebar";
import { SearchDialog } from "./search-dialog";

export function DocsAppSidebar(props: ComponentProps<typeof Sidebar>) {
  const closeMobileSidebar = useCloseMobileSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />} onClick={closeMobileSidebar}>
              <span className="font-mono text-sm font-semibold tracking-tighter">
                {siteConfig.name}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchDialog />
      </SidebarHeader>
      <SidebarContent>
        <DocsSidebarNav />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
