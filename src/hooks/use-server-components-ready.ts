import ReactDOM from "react-dom";

// TanStack Start's RSC proxies expose these through global symbols. When a
// payload carries client CSS or JS, decoding waits until it first renders and
// then suspends inside an empty Suspense boundary, so the section appears
// blank before its content fills in.
const RSC_GET_TREE = Symbol.for("tanstack.rsc.getTree");
const RSC_CSS_HREFS = Symbol.for("tanstack.rsc.cssHrefs");
const RSC_JS_PRELOADS = Symbol.for("tanstack.rsc.jsPreloads");

type ServerComponentData = {
  [RSC_GET_TREE]?: () => unknown;
  [RSC_CSS_HREFS]?: Iterable<string>;
  [RSC_JS_PRELOADS]?: Iterable<string>;
};

/**
 * Suspends the calling component until every server component payload is
 * decoded, so the route waits for its content instead of rendering empty
 * sections.
 */
export function useServerComponentsReady(...sources: unknown[]) {
  const payloads = sources.filter(isServerComponentData);

  // Start every asset request before suspending on the first decode.
  for (const payload of payloads) {
    for (const href of payload[RSC_CSS_HREFS] ?? []) {
      ReactDOM.preinit(href, { as: "style", precedence: "high" });
    }

    for (const href of payload[RSC_JS_PRELOADS] ?? []) {
      ReactDOM.preloadModule(href);
    }
  }

  for (const payload of payloads) {
    payload[RSC_GET_TREE]?.();
  }
}

function isServerComponentData(value: unknown): value is ServerComponentData {
  return (
    (typeof value === "object" || typeof value === "function") &&
    value !== null &&
    typeof (value as ServerComponentData)[RSC_GET_TREE] === "function"
  );
}
