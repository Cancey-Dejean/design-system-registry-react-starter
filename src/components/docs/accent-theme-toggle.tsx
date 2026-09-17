import { IconPalette } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { accentThemes, isAccentTheme } from "../../lib/accent-theme";
import { useAccentTheme } from "./accent-theme-provider";

export function AccentThemeToggle() {
  const { accentTheme, setAccentTheme } = useAccentTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
        <IconPalette />
        <span className="sr-only">Change accent color</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Accent color</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={accentTheme}
            onValueChange={(value) => {
              if (isAccentTheme(value)) {
                setAccentTheme(value);
              }
            }}
          >
            {accentThemes.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value} className="gap-2">
                <span
                  className="size-3 shrink-0 rounded-full border border-black/10 dark:border-white/10"
                  style={{ backgroundColor: option.swatch }}
                  aria-hidden="true"
                />
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
