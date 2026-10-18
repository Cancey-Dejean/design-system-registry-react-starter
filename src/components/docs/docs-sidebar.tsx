import { IconChevronRight } from "@tabler/icons-react";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
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
import { getBlockCategory } from "@/lib/registry/block-gallery";

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
      <SidebarMenu className="gap-2">
        {sections.map((section) => (
          <SidebarSection
            key={section.id}
            section={section}
            pathname={pathname}
            onNavigate={closeMobile}
          />
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="font-medium"
            isActive={pathname === "/flows"}
            render={<Link to="/flows" />}
            onClick={closeMobile}
          >
            <span>Component flows</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
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
  if (section.id === "blocks")
    return <BlockSidebarSection section={section} pathname={pathname} onNavigate={onNavigate} />;
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
              <SidebarMenuSub className="mr-0 pr-0">
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

function BlockSidebarSection({
  section,
  pathname,
  onNavigate,
}: {
  section: SiteNavigationSection;
  pathname: string;
  onNavigate: () => void;
}) {
  const searchStr = useRouterState({ select: (state) => state.location.searchStr });
  const queryCategory = new URLSearchParams(searchStr).get("category");
  const groups = new Map<string, { id: string; title: string; count: number }>();
  for (const item of section.items) {
    if (item.kind !== "registry") continue;
    const category = getBlockCategory(item.name);
    const current = groups.get(category.id);
    groups.set(category.id, { ...category, count: (current?.count ?? 0) + 1 });
  }
  const detail = section.items.find((item) => item.routePath === pathname);
  const activeCategory =
    pathname === "/blocks/hero"
      ? "hero"
      : detail?.kind === "registry"
        ? getBlockCategory(detail.name).id
        : pathname === "/blocks"
          ? queryCategory
          : null;
  const isAllActive = pathname === "/blocks" && !queryCategory;
  const shouldOpen = pathname === "/blocks" || pathname.startsWith("/blocks/");
  return (
    <SidebarMenuItem>
      <Collapsible
        key={shouldOpen ? "active" : "inactive"}
        defaultOpen={shouldOpen}
        className="group/collapsible"
      >
        <SectionMenuButton section={section} isActive={isAllActive} onNavigate={onNavigate} />
        <CollapsibleTrigger render={<SidebarMenuAction className="aria-expanded:rotate-90" />}>
          <IconChevronRight />
          <span className="sr-only">Toggle Blocks</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0 pr-0">
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                isActive={isAllActive}
                render={
                  <Link
                    to="/$section"
                    params={{ section: "blocks" }}
                    search={{ category: undefined }}
                  />
                }
                onClick={onNavigate}
              >
                <span>All blocks</span>
                <Badge variant="secondary" className="ml-auto">
                  {section.items.length}
                </Badge>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            {[...groups.values()].map((category) => (
              <SidebarMenuSubItem key={category.id}>
                <SidebarMenuSubButton
                  isActive={activeCategory === category.id}
                  render={
                    category.id === "hero" ? (
                      <Link to="/blocks/hero" />
                    ) : (
                      <Link
                        to="/$section"
                        params={{ section: "blocks" }}
                        search={{ category: category.id }}
                      />
                    )
                  }
                  onClick={onNavigate}
                >
                  <span className="min-w-0 truncate">{category.title}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {category.count}
                  </Badge>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
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
          <span>{title}</span>
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
          <span>{title}</span>
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
          <span>{title}</span>
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
          <span>{item.title}</span>
        </SidebarMenuSubButton>
      );
    }

    return (
      <SidebarMenuSubButton
        isActive={isActive}
        render={<Link to="/docs/$slug" params={{ slug: item.slug }} />}
        onClick={onNavigate}
      >
        <span className="min-w-0 truncate">{item.title}</span>
        {item.audience === "maintainers" ? <MaintainersBadge /> : <DevBadge />}
      </SidebarMenuSubButton>
    );
  }

  return (
    <SidebarMenuSubButton
      isActive={isActive}
      render={<Link to="/$section/$name" params={{ section: item.sectionId, name: item.name }} />}
      onClick={onNavigate}
    >
      <span className="min-w-0 truncate">{item.title}</span>
      {item.type === "registry:hook" ? <HookBadge /> : null}
    </SidebarMenuSubButton>
  );
}

function HookBadge() {
  return (
    <Badge
      title="Hook"
      aria-label="Hook"
      className="ml-auto size-4.5 justify-center bg-amber-500/15 px-0 font-mono text-[10px] font-semibold text-amber-700 dark:text-amber-300"
    >
      H
    </Badge>
  );
}

function DevBadge() {
  return (
    <Badge
      variant="outline"
      title="For developers and consumers of the registry"
      className="ml-auto h-4.5 px-1.5 font-mono text-[10px] font-normal tracking-wide text-muted-foreground uppercase"
    >
      Dev
    </Badge>
  );
}

function MaintainersBadge() {
  return (
    <Badge
      variant="outline"
      title="For registry maintainers, not projects that install from the registry"
      className="ml-auto h-4.5 px-1.5 font-mono text-[10px] font-normal tracking-wide text-muted-foreground uppercase"
    >
      Maintainers
    </Badge>
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
