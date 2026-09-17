import * as React from "react";

const MOBILE_QUERY = "(max-width: 767px)";

function getIsMobile() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getIsMobile, () => false);
}
