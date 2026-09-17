export const accentThemes = [
  { value: "default", label: "Default", swatch: "oklch(0.205 0 0)" },
  { value: "theme-secondary", label: "Amber", swatch: "oklch(0.72 0.19 50)" },
  { value: "theme-tertiary", label: "Violet", swatch: "oklch(0.55 0.24 295)" },
] as const;

export type AccentTheme = (typeof accentThemes)[number]["value"];

export const DEFAULT_ACCENT_THEME: AccentTheme = "default";
export const ACCENT_THEME_STORAGE_KEY = "accent-theme";

export function isAccentTheme(value: string | null | undefined): value is AccentTheme {
  return accentThemes.some((option) => option.value === value);
}

export function applyAccentTheme(value: AccentTheme) {
  if (value === DEFAULT_ACCENT_THEME) {
    document.documentElement.removeAttribute("data-theme");
    return;
  }

  document.documentElement.setAttribute("data-theme", value);
}

export function getAccentThemeScript(storageKey: string) {
  const key = JSON.stringify(storageKey);

  return `(function(){try{var v=localStorage.getItem(${key});if(v&&v!=="default"){document.documentElement.setAttribute("data-theme",v)}}catch(e){}})();`;
}
