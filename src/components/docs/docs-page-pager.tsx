import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import type { SiteNavigationItem } from "../../lib/navigation";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

type DocsPagePagerProps = {
  previous: SiteNavigationItem | null;
  next: SiteNavigationItem | null;
};

export function DocsPagePager({ previous, next }: DocsPagePagerProps) {
  return (
    <ButtonGroup aria-label="Page navigation">
      <AdjacentPageButton direction="previous" item={previous} />
      <AdjacentPageButton direction="next" item={next} />
    </ButtonGroup>
  );
}

function AdjacentPageButton({
  direction,
  item,
}: {
  direction: "previous" | "next";
  item: SiteNavigationItem | null;
}) {
  const label = direction === "previous" ? "Previous page" : "Next page";
  const Icon = direction === "previous" ? IconChevronLeft : IconChevronRight;
  const ariaLabel = item ? `${label}: ${item.title}` : label;
  const icon = <Icon />;

  if (!item) {
    return (
      <Button size="icon" variant="outline" disabled aria-label={ariaLabel}>
        {icon}
      </Button>
    );
  }

  if (item.kind === "docs") {
    if (!item.slug) {
      return (
        <Button
          size="icon"
          variant="outline"
          aria-label={ariaLabel}
          title={item.title}
          render={<Link to="/docs" />}
        >
          {icon}
        </Button>
      );
    }

    return (
      <Button
        size="icon"
        variant="outline"
        aria-label={ariaLabel}
        title={item.title}
        render={<Link to="/docs/$slug" params={{ slug: item.slug }} />}
      >
        {icon}
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="outline"
      aria-label={ariaLabel}
      title={item.title}
      render={<Link to="/$section/$name" params={{ section: item.sectionId, name: item.name }} />}
    >
      {icon}
    </Button>
  );
}
