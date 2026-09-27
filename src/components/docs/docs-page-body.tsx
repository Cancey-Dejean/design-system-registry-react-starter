import type * as React from "react";

import type { DocsTocLink } from "../../lib/docs/toc";
import { DocsTableOfContents } from "./docs-table-of-contents";

type DocsPageBodyProps = {
  children: React.ReactNode;
  toc?: readonly DocsTocLink[];
};

export function DocsPageBody({ children, toc }: DocsPageBodyProps) {
  return (
    <div className="flex min-w-0 items-start gap-8">
      <article className="flex min-w-0 flex-1 flex-col gap-8">{children}</article>
      {toc && toc.length > 0 ? (
        <aside className="sticky top-16 hidden w-56 shrink-0 py-6 xl:block">
          <DocsTableOfContents links={toc} />
        </aside>
      ) : null}
    </div>
  );
}
