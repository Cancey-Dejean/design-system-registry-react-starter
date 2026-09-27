"use client";

import * as React from "react";

import type { DocsTocLink } from "../../lib/docs/toc";
import { cn } from "../../lib/utils";

const ACTIVATION_OFFSET = 96;
const TOC_CHANGE_EVENT = "docs-toc-change";

type DocsTableOfContentsProps = {
  links: readonly DocsTocLink[];
};

export function DocsTableOfContents({ links }: DocsTableOfContentsProps) {
  const flatLinks = React.useMemo(() => flattenTocLinks(links), [links]);
  const [clickedId, setClickedId] = React.useState<string | null>(null);
  const scrollActiveId = React.useSyncExternalStore(
    subscribeToToc,
    () => getActiveHeadingId(flatLinks),
    () => null,
  );
  const activeId = clickedId ?? scrollActiveId;

  function onLinkClick(id: string) {
    setClickedId(id);
    window.setTimeout(() => setClickedId(null), 600);
    window.dispatchEvent(new Event(TOC_CHANGE_EVENT));
  }

  return (
    <nav aria-label="On this page" className="flex flex-col gap-3 text-sm">
      <span className="text-foreground font-medium">On This Page</span>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.id}>
            <TocAnchor link={link} activeId={activeId} onClick={onLinkClick} />
            {link.children?.length ? (
              <ul className="ml-3">
                {link.children.map((child) => (
                  <li key={child.id}>
                    <TocAnchor
                      link={child}
                      activeId={activeId}
                      onClick={onLinkClick}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TocAnchor({
  link,
  activeId,
  onClick,
}: {
  link: DocsTocLink;
  activeId: string | null;
  onClick: (id: string) => void;
}) {
  return (
    <a
      href={`#${link.id}`}
      className={cn(
        "-ml-px block border-l-2 py-1 pl-3 transition-colors",
        activeId === link.id
          ? "border-foreground text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground border-transparent",
      )}
      onClick={() => onClick(link.id)}
    >
      {link.text}
    </a>
  );
}

function flattenTocLinks(links: readonly DocsTocLink[]): DocsTocLink[] {
  return links.flatMap((link) => [
    link,
    ...(link.children ? flattenTocLinks(link.children) : []),
  ]);
}

function subscribeToToc(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener(TOC_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener(TOC_CHANGE_EVENT, onStoreChange);
  };
}

function getActiveHeadingId(flatLinks: readonly DocsTocLink[]): string | null {
  const headingEls = flatLinks
    .map((link) => ({ id: link.id, el: document.getElementById(link.id) }))
    .filter(
      (entry): entry is { id: string; el: HTMLElement } => entry.el !== null,
    );

  if (headingEls.length === 0) {
    return null;
  }

  const scrolledToBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (scrolledToBottom) {
    return headingEls.at(-1)?.id ?? null;
  }

  let current = headingEls[0]?.id ?? null;

  for (const { id, el } of headingEls) {
    if (el.getBoundingClientRect().top > ACTIVATION_OFFSET) {
      break;
    }

    current = id;
  }

  return current;
}
