import { Link } from "@tanstack/react-router";

import { siteConfig } from "../../lib/site-config";
import { HeaderActions } from "./header-actions";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-semibold tracking-tighter">
            {siteConfig.name}
          </span>
        </Link>
        <HeaderActions className="ml-auto" />
      </div>
    </header>
  );
}
