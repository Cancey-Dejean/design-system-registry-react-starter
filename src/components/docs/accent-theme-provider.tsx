import { ScriptOnce } from "@tanstack/react-router";
import * as React from "react";

import {
  ACCENT_THEME_STORAGE_KEY,
  applyAccentTheme,
  DEFAULT_ACCENT_THEME,
  getAccentThemeScript,
  isAccentTheme,
  type AccentTheme,
} from "../../lib/accent-theme";

const ACCENT_THEME_CHANGE_EVENT = "accent-theme-change";

type AccentThemeContextValue = {
  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
};

const AccentThemeContext = React.createContext<AccentThemeContextValue | null>(null);

function getStoredAccentTheme(): AccentTheme {
  if (typeof window === "undefined") {
    return DEFAULT_ACCENT_THEME;
  }

  const storedTheme = window.localStorage.getItem(ACCENT_THEME_STORAGE_KEY);

  return isAccentTheme(storedTheme) ? storedTheme : DEFAULT_ACCENT_THEME;
}

function subscribeAccentTheme(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === ACCENT_THEME_STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(ACCENT_THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(ACCENT_THEME_CHANGE_EVENT, onStoreChange);
  };
}

export function AccentThemeProvider({ children }: { children: React.ReactNode }) {
  const accentTheme = React.useSyncExternalStore(
    subscribeAccentTheme,
    getStoredAccentTheme,
    () => DEFAULT_ACCENT_THEME,
  );

  const setAccentTheme = React.useCallback((nextTheme: AccentTheme) => {
    window.localStorage.setItem(ACCENT_THEME_STORAGE_KEY, nextTheme);
    applyAccentTheme(nextTheme);
    window.dispatchEvent(new Event(ACCENT_THEME_CHANGE_EVENT));
  }, []);

  React.useLayoutEffect(() => {
    applyAccentTheme(accentTheme);
  }, [accentTheme]);

  const value = React.useMemo(
    () => ({ accentTheme, setAccentTheme }),
    [accentTheme, setAccentTheme],
  );

  return (
    <AccentThemeContext value={value}>
      <ScriptOnce>{getAccentThemeScript(ACCENT_THEME_STORAGE_KEY)}</ScriptOnce>
      {children}
    </AccentThemeContext>
  );
}

export function useAccentTheme() {
  const context = React.useContext(AccentThemeContext);

  if (!context) {
    throw new Error("useAccentTheme must be used within AccentThemeProvider");
  }

  return context;
}
