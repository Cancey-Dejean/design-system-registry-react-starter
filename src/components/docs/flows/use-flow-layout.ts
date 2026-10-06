import * as React from "react";

export const flowLayouts = ["map", "lanes", "chain"] as const;

export type FlowLayout = (typeof flowLayouts)[number];

export const defaultFlowLayout: FlowLayout = "lanes";

const FLOW_LAYOUT_STORAGE_KEY = "component-flows:layout";
const FLOW_LAYOUT_CHANGE_EVENT = "component-flows:layout-change";

let memoryLayout: FlowLayout | null = null;

function isFlowLayout(value: unknown): value is FlowLayout {
  return typeof value === "string" && flowLayouts.some((layout) => layout === value);
}

function readFlowLayout(): FlowLayout {
  try {
    const stored = window.sessionStorage.getItem(FLOW_LAYOUT_STORAGE_KEY);

    if (isFlowLayout(stored)) {
      return stored;
    }
  } catch {
    // sessionStorage can throw when storage is disabled; fall back to memory.
  }

  return memoryLayout ?? defaultFlowLayout;
}

function subscribeFlowLayout(onStoreChange: () => void) {
  window.addEventListener(FLOW_LAYOUT_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener(FLOW_LAYOUT_CHANGE_EVENT, onStoreChange);
  };
}

/** The chosen flows layout, persisted for the browser session (not across sessions). */
export function useFlowLayout() {
  const layout = React.useSyncExternalStore(
    subscribeFlowLayout,
    readFlowLayout,
    () => defaultFlowLayout,
  );

  const setLayout = React.useCallback((nextLayout: FlowLayout) => {
    memoryLayout = nextLayout;

    try {
      window.sessionStorage.setItem(FLOW_LAYOUT_STORAGE_KEY, nextLayout);
    } catch {
      // sessionStorage can throw when storage is disabled; the memory copy still applies.
    }

    window.dispatchEvent(new Event(FLOW_LAYOUT_CHANGE_EVENT));
  }, []);

  return [layout, setLayout] as const;
}
