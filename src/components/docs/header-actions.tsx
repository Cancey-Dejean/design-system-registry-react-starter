import { IconBrandGithub } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import StorybookLogo from "../../../registry/items/components/logos/logo-set/storybook";
import { siteConfig } from "../../lib/site-config";
import { cn } from "../../lib/utils";
import { AccentThemeToggle } from "./accent-theme-toggle";
import { ThemeToggle } from "./theme-toggle";

type HeaderActionsProps = {
  className?: string;
};

export function HeaderActions({ className }: HeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="ghost"
        size="icon"
        nativeButton={false}
        render={
          <a
            href={siteConfig.storybookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Storybook"
          />
        }
      >
        <StorybookLogo data-icon className="size-4" />
        <span className="sr-only">Storybook</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        nativeButton={false}
        render={
          <a
            href={siteConfig.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          />
        }
      >
        <IconBrandGithub data-icon />
        <span className="sr-only">GitHub</span>
      </Button>
      <AccentThemeToggle />
      <ThemeToggle />
    </div>
  );
}
