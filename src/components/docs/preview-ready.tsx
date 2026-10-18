import { useEffect } from "react";

/** Sent after React commits the decoded preview, rather than when the iframe shell loads. */
export function PreviewReady({ name }: { name: string }) {
  useEffect(() => {
    window.parent.postMessage({ type: "registry-preview-ready", name }, window.location.origin);
  }, [name]);
  return <span hidden data-registry-preview-ready={name} />;
}
