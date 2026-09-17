import { IconChevronRight } from "@tabler/icons-react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  getSiteNavigationSections,
  type SiteNavigationItem,
  type SiteNavigationSection,
} from "../../lib/navigation";

export function DocsSidebarNav() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const sections = getSiteNavigationSections();
  const closeMobile = useCloseMobileSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {sections.map((section) => (
          <SidebarSection
            key={section.id}
            section={section}
            pathname={pathname}
            onNavigate={closeMobile}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarSection({
  section,
  pathname,
  onNavigate,
}: {
  section: SiteNavigationSection;
  pathname: string;
  onNavigate: () => void;
}) {
  const isIndexActive = pathname === section.basePath;
  const hasActiveItem = section.items.some((item) => item.routePath === pathname);
  const shouldOpen = isIndexActive || hasActiveItem;

  return (
    <SidebarMenuItem>
      <Collapsible
        key={shouldOpen ? "active" : "inactive"}
        defaultOpen={shouldOpen}
        className="group/collapsible"
      >
        <SectionMenuButton section={section} isActive={isIndexActive} onNavigate={onNavigate} />
        {section.items.length > 0 ? (
          <>
            <CollapsibleTrigger render={<SidebarMenuAction className="aria-expanded:rotate-90" />}>
              <IconChevronRight />
              <span className="sr-only">Toggle {section.title}</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {section.items.map((item) => (
                  <SidebarMenuSubItem key={itemKey(item)}>
                    <ItemMenuButton item={item} pathname={pathname} onNavigate={onNavigate} />
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </Collapsible>
    </SidebarMenuItem>
  );
}

function SectionMenuButton({
  section,
  isActive,
  onNavigate,
}: {
  section: SiteNavigationSection;
  isActive: boolean;
  onNavigate: () => void;
}) {
  const title = section.title;

  switch (section.id) {
    case "docs":
      return (
        <SidebarMenuButton
          className="font-medium"
          isActive={isActive}
          render={<Link to="/docs" />}
          onClick={onNavigate}
        >
          {title}
        </SidebarMenuButton>
      );
    case "components":
    case "blocks":
    case "utilities":
      return (
        <SidebarMenuButton
          className="font-medium"
          isActive={isActive}
          render={<Link to="/$section" params={{ section: section.id }} />}
          onClick={onNavigate}
        >
          {title}
        </SidebarMenuButton>
      );
    case "registry":
      return (
        <SidebarMenuButton
          className="font-medium"
          isActive={isActive}
          render={<Link to="/registry" />}
          onClick={onNavigate}
        >
          {title}
        </SidebarMenuButton>
      );
    default:
      return null;
  }
}

function ItemMenuButton({
  item,
  pathname,
  onNavigate,
}: {
  item: SiteNavigationItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const isActive = item.routePath === pathname;

  if (item.kind === "docs") {
    if (!item.slug) {
      return (
        <SidebarMenuSubButton isActive={isActive} render={<Link to="/docs" />} onClick={onNavigate}>
          {item.title}
        </SidebarMenuSubButton>
      );
    }

    return (
      <SidebarMenuSubButton
        isActive={isActive}
        render={<Link to="/docs/$slug" params={{ slug: item.slug }} />}
        onClick={onNavigate}
      >
        {item.title}
      </SidebarMenuSubButton>
    );
  }

  return (
    <SidebarMenuSubButton
      isActive={isActive}
      render={<Link to="/$section/$name" params={{ section: item.sectionId, name: item.name }} />}
      onClick={onNavigate}
    >
      {item.title}
    </SidebarMenuSubButton>
  );
}

function itemKey(item: SiteNavigationItem) {
  return `${item.kind}:${item.kind === "docs" ? item.slug : item.name}`;
}

export function useCloseMobileSidebar() {
  const { setOpenMobile } = useSidebar();

  return React.useCallback(() => {
    setOpenMobile(false);
  }, [setOpenMobile]);
}

export function CloseMobileSidebarOnNavigate() {
  const router = useRouter();
  const closeMobileSidebar = useCloseMobileSidebar();

  React.useEffect(() => {
    return router.subscribe("onBeforeLoad", (event) => {
      if (event.pathChanged) {
        closeMobileSidebar();
      }
    });
  }, [closeMobileSidebar, router]);

  return null;
}
