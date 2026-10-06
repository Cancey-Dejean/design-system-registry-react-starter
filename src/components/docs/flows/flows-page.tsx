import * as React from "react";

import {
  getDependents,
  getLocalDependencies,
  type RegistryFlowGraph,
} from "@/lib/registry/flow-graph";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { useTheme } from "../theme-provider";
import type { FlowViewProps } from "./flow-canvas";
import { FlowChainView } from "./flow-chain-view";
import { FlowLanesView } from "./flow-lanes-view";
import { FlowLayoutSelector } from "./flow-layout-selector";
import { FlowMapView } from "./flow-map-view";
import { useFlowLayout, type FlowLayout } from "./use-flow-layout";

const flowViews: Record<FlowLayout, React.ComponentType<FlowViewProps>> = {
  map: FlowMapView,
  lanes: FlowLanesView,
  chain: FlowChainView,
};

type FlowsPageProps = {
  graph: RegistryFlowGraph;
  title: string;
  description: string;
};

function getInitialSelection(graph: RegistryFlowGraph): string {
  const connectionCount = (name: string) =>
    getLocalDependencies(graph, name).length + getDependents(graph, name).length;

  return graph.names.reduce<string>(
    (best, name) => (best === "" || connectionCount(name) > connectionCount(best) ? name : best),
    "",
  );
}

export function FlowsPage({ graph, title, description }: FlowsPageProps) {
  const [layout, setLayout] = useFlowLayout();
  const [selected, setSelected] = React.useState(() => getInitialSelection(graph));
  const { resolvedTheme } = useTheme();
  const View = flowViews[layout];
  const sharedCount = graph.dependents.size;
  const viewOwnsHeader = layout !== "map";

  const header = (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{siteConfig.namespace}</span> ·{" "}
          {graph.names.length} items · {sharedCount} shared
        </p>
      </div>
      <FlowLayoutSelector value={layout} onValueChange={setLayout} />
    </header>
  );

  return (
    <div className={cn("flex flex-col gap-6", !viewOwnsHeader && "pb-6")}>
      {selected && viewOwnsHeader ? null : header}

      {selected ? (
        <View
          graph={graph}
          selected={selected}
          onSelect={setSelected}
          colorMode={resolvedTheme === "dark" ? "dark" : "light"}
          header={viewOwnsHeader ? header : undefined}
        />
      ) : (
        <p className="text-sm text-muted-foreground">No registry items yet.</p>
      )}
    </div>
  );
}
