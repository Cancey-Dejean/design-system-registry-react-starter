import { IconMoon, IconSun } from "@tabler/icons-react";

import { Button } from "../ui/button";
import { useTheme } from "./theme-provider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const Icon = resolvedTheme === "dark" ? IconMoon : IconSun;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      aria-label={
        nextTheme === "dark" ? "Switch to dark mode" : "Switch to light mode"
      }
      onClick={() => setTheme(nextTheme)}
    >
      <Icon />
    </Button>
  );
}
