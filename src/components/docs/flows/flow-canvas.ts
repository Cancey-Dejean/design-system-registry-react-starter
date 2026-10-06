import type { ColorMode, Edge, ReactFlowProps } from "@xyflow/react";
import type * as React from "react";

import type { RegistryFlowGraph } from "@/lib/registry/flow-graph";

export type FlowViewProps = {
  graph: RegistryFlowGraph;
  selected: string;
  onSelect: (name: string) => void;
  colorMode: ColorMode;
  header?: React.ReactNode;
};

export const flowSidebarScrollClassName =
  "scroll-fade overscroll-contain [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent";

export const flowCanvasDefaults = {
  nodesDraggable: false,
  nodesConnectable: false,
  elementsSelectable: false,
  minZoom: 0.3,
  maxZoom: 1.6,
} satisfies Partial<ReactFlowProps>;

export function getFlowEdgeStyle(
  stroke: string,
  extra: React.CSSProperties = {},
): NonNullable<Edge["style"]> {
  return { stroke, strokeWidth: 1.5, ...extra };
}
