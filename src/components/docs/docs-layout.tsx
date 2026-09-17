import { Link, useRouterState } from "@tanstack/react-router";
import type * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { getActiveSiteNavigation, type SiteNavigationSection } from "../../lib/navigation";
import { DocsAppSidebar } from "./docs-app-sidebar";
import { CloseMobileSidebarOnNavigate } from "./docs-sidebar";
import { HeaderActions } from "./header-actions";
import { SearchDialogProvider } from "./search-dialog";
import { SiteFooter } from "./site-footer";

type DocsLayoutProps = {
  children: React.ReactNode;
};

export function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const { activeSection, activeItem } = getActiveSiteNavigation(pathname);

  return (
    <SidebarProvider>
      <CloseMobileSidebarOnNavigate />
      <SearchDialogProvider>
        <DocsAppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background">
            <div className="flex w-full items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mx-2 data-vertical:h-4 data-vertical:self-center"
              />
              {activeSection ? (
                <Breadcrumb>
                  <BreadcrumbList>
                    {activeItem ? (
                      <>
                        <BreadcrumbItem className="hidden md:block">
                          <SectionBreadcrumbLink section={activeSection} />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{activeItem.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    ) : (
                      <BreadcrumbItem>
                        <BreadcrumbPage>{activeSection.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              ) : null}
              <HeaderActions className="ml-auto" />
            </div>
          </header>
          <div className="flex min-w-0 flex-1 flex-col gap-4 pt-6 pr-4 pl-6">{children}</div>
          <SiteFooter />
        </SidebarInset>
      </SearchDialogProvider>
    </SidebarProvider>
  );
}

function SectionBreadcrumbLink({ section }: { section: SiteNavigationSection }) {
  switch (section.id) {
    case "docs":
      return <BreadcrumbLink render={<Link to="/docs" />}>{section.title}</BreadcrumbLink>;
    case "components":
    case "blocks":
    case "utilities":
      return (
        <BreadcrumbLink render={<Link to="/$section" params={{ section: section.id }} />}>
          {section.title}
        </BreadcrumbLink>
      );
    case "registry":
      return <BreadcrumbLink render={<Link to="/registry" />}>{section.title}</BreadcrumbLink>;
    default:
      return null;
  }
}
