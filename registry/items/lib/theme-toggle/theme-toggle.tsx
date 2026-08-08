"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const THEME_STORAGE_KEY = "data-theme";

const themes = ["theme-primary", "theme-secondary", "theme-tertiary"] as const;

type BrandTheme = (typeof themes)[number];

const themeLabels: Record<BrandTheme, string> = {
  "theme-primary": "Primary",
  "theme-secondary": "Secondary",
  "theme-tertiary": "Tertiary",
};

function isBrandTheme(value: string | null): value is BrandTheme {
  return value === "theme-primary" || value === "theme-secondary" || value === "theme-tertiary";
}

function applyBrandTheme(theme: BrandTheme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function getInitialTheme(): BrandTheme {
  if (typeof window === "undefined") {
    return "theme-primary";
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isBrandTheme(stored)) {
    return stored;
  }

  const attribute = document.documentElement.getAttribute("data-theme");
  if (isBrandTheme(attribute)) {
    return attribute;
  }

  return "theme-primary";
}

type ThemeToggleProps = {
  className?: string;
  defaultTheme?: BrandTheme;
};

function ThemeToggle({ className, defaultTheme = "theme-primary" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<BrandTheme>(defaultTheme);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyBrandTheme(initialTheme);
  }, []);

  function selectTheme(nextTheme: BrandTheme) {
    setTheme(nextTheme);
    applyBrandTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  return (
    <div
      role="group"
      aria-label="Brand theme"
      data-slot="theme-toggle"
      className={cn("inline-flex flex-wrap items-center gap-2", className)}
    >
      {themes.map((option) => {
        const selected = theme === option;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            data-state={selected ? "on" : "off"}
            onClick={() => selectTheme(option)}
            className={cn(
              "inline-flex h-8 items-center rounded-lg border px-2.5 text-sm font-medium transition-colors",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:bg-muted",
            )}
          >
            {themeLabels[option]}
          </button>
        );
      })}
    </div>
  );
}

export { ThemeToggle, themes, type BrandTheme, THEME_STORAGE_KEY };
export default ThemeToggle;
