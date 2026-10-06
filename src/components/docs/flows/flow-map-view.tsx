import { Link } from "@tanstack/react-router";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
} from "@xyflow/react";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  FileCodeIcon,
  GlobeIcon,
  PackageIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  getDependencyDepths,
  getDependents,
  getLocalDependencies,
  getTransitiveNeighbors,
  getVia,
  isConnected,
  type RegistryFlowDirection,
  type RegistryFlowGraph,
} from "@/lib/registry/flow-graph";
import type { RegistryItemType } from "@/lib/registry/item-types";
import { getRegistrySectionIdForType } from "@/lib/registry/sections";

import { DocsInstallCommand } from "../install-command";
import {
  flowCanvasDefaults,
  flowSegmentClassName,
  flowSegmentedClassName,
  flowToolbarClassName,
  flowToolbarLabelClassName,
  getFlowEdgeStyle,
  type FlowViewProps,
} from "./flow-canvas";
import {
  FLOW_ITEM_HEIGHT,
  FLOW_ITEM_WIDTH,
  FlowItemNodeView,
  FlowLabelNodeView,
  flowColors,
  getRegistryTypeIcon,
  getRegistryTypeLabel,
  RegistryTypeIcon,
  splitFilePath,
  type FlowItemNode,
  type FlowLabelNode,
  type FlowTone,
} from "./flow-nodes";

type MapNode = FlowItemNode | FlowLabelNode;

const nodeTypes = { item: FlowItemNodeView, label: FlowLabelNodeView };
const COLUMN_GAP = 320;
const ROW_GAP = 60;
const columnNames = ["Foundations", "Composites", "Compositions", "Assemblies"];

function getMapLayout(graph: RegistryFlowGraph) {
  const depths = getDependencyDepths(graph);
  const connected = graph.names.filter((name) => isConnected(graph, name));
  const columns: string[][] = [];

  for (const name of connected) {
    const depth = depths.get(name) ?? 0;
    columns[depth] = [...(columns[depth] ?? []), name];
  }

  const sortedColumns = Array.from(columns, (column) =>
    (column ?? []).toSorted((a, b) => {
      const typeA = graph.items.get(a)?.type ?? "";
      const typeB = graph.items.get(b)?.type ?? "";

      return typeA.localeCompare(typeB) || a.localeCompare(b);
    }),
  );
  const tallest = Math.max(1, ...sortedColumns.map((column) => column.length));
  const positions = new Map<string, { x: number; y: number }>();

  sortedColumns.forEach((column, depth) => {
    const offset = ((tallest - column.length) * ROW_GAP) / 2;

    column.forEach((name, index) => {
      positions.set(name, { x: depth * COLUMN_GAP, y: offset + index * ROW_GAP });
    });
  });

  return { connected, columns: sortedColumns, positions };
}

function getTone(
  name: string,
  active: string | null,
  up: ReadonlySet<string>,
  down: ReadonlySet<string>,
  query: string,
): FlowTone {
  if (name === active) {
    return "focus";
  }

  if (query && !name.includes(query)) {
    return "dim";
  }

  if (up.has(name)) {
    return "up";
  }

  if (down.has(name)) {
    return "down";
  }

  return active ? "dim" : "default";
}

export function FlowMapView(props: FlowViewProps) {
  return (
    <ReactFlowProvider>
      <FlowMapCanvas {...props} />
    </ReactFlowProvider>
  );
}

function FlowMapCanvas({ graph, selected, onSelect, colorMode }: FlowViewProps) {
  const flow = useReactFlow();
  const [inspectorOpen, setInspectorOpen] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [hiddenTypes, setHiddenTypes] = React.useState<ReadonlySet<RegistryItemType>>(
    () => new Set(),
  );
  const layout = React.useMemo(() => getMapLayout(graph), [graph]);
  const active = inspectorOpen ? selected : null;
  const up = React.useMemo(
    () => (active ? getTransitiveNeighbors(graph, active, "up") : new Set<string>()),
    [graph, active],
  );
  const down = React.useMemo(
    () => (active ? getTransitiveNeighbors(graph, active, "down") : new Set<string>()),
    [graph, active],
  );
  const normalizedQuery = query.trim().toLowerCase();

  const typeCounts = React.useMemo(() => {
    const counts = new Map<RegistryItemType, number>();

    for (const name of layout.connected) {
      const type = graph.items.get(name)?.type;

      if (type) {
        counts.set(type, (counts.get(type) ?? 0) + 1);
      }
    }

    return [...counts];
  }, [graph, layout]);

  const visible = layout.connected.filter((name) => {
    const type = graph.items.get(name)?.type;

    return type !== undefined && !hiddenTypes.has(type);
  });
  const visibleSet = new Set(visible);

  const nodes: MapNode[] = [
    ...layout.columns.map(
      (column, depth): FlowLabelNode => ({
        id: `column-${depth}`,
        type: "label",
        position: { x: depth * COLUMN_GAP, y: -40 },
        data: { label: `${columnNames[depth] ?? `Depth ${depth}`} · ${column.length}` },
      }),
    ),
    ...visible.map((name): FlowItemNode => {
      const item = graph.items.get(name);
      const dependencyCount = getLocalDependencies(graph, name).length;
      const dependentCount = getDependents(graph, name).length;

      return {
        id: name,
        type: "item",
        position: layout.positions.get(name) ?? { x: 0, y: 0 },
        width: FLOW_ITEM_WIDTH,
        height: FLOW_ITEM_HEIGHT,
        data: {
          label: item?.title ?? name,
          icon: item ? getRegistryTypeIcon(item.type) : undefined,
          meta: `${dependencyCount}↑ ${dependentCount}↓`,
          tone: getTone(name, active, up, down, normalizedQuery),
          target: name,
          title: `${item?.title ?? name}: depends on ${dependencyCount}, used by ${dependentCount}`,
        },
      };
    }),
  ];

  const edges: Edge[] = visible.flatMap((name) =>
    getLocalDependencies(graph, name)
      .filter((dependency) => visibleSet.has(dependency))
      .map((dependency) => {
        const inUp = (name === active || up.has(name)) && up.has(dependency);
        const inDown = (dependency === active || down.has(dependency)) && down.has(name);
        let style = getFlowEdgeStyle(flowColors.faint, { opacity: active ? 0.5 : 1 });

        if (inUp) {
          style = getFlowEdgeStyle(flowColors.up, { strokeWidth: 2 });
        } else if (inDown) {
          style = getFlowEdgeStyle(flowColors.down, { strokeWidth: 2 });
        }

        return {
          id: `${dependency}->${name}`,
          source: dependency,
          target: name,
          animated: inUp || inDown,
          zIndex: inUp || inDown ? 1 : 0,
          style,
        };
      }),
  );

  const select = (name: string) => {
    onSelect(name);
    setInspectorOpen(true);

    const position = layout.positions.get(name);

    if (position) {
      void flow.setCenter(
        position.x + FLOW_ITEM_WIDTH / 2 + 80,
        position.y + FLOW_ITEM_HEIGHT / 2,
        {
          zoom: flow.getZoom(),
          duration: 450,
        },
      );
    }
  };

  const toggleType = (type: RegistryItemType) => {
    setHiddenTypes((previous) => {
      const next = new Set(previous);

      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }

      return next;
    });
  };

  return (
    <section className="flex h-[min(780px,calc(100svh-13rem))] min-h-120 flex-col overflow-hidden rounded-xl border bg-card">
      <div className={flowToolbarClassName}>
        <span className={flowToolbarLabelClassName}>
          How it connects ·{" "}
          <span className="normal-case">
            {layout.connected.length} connected · {graph.names.length - layout.connected.length}{" "}
            standalone hidden
          </span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-48">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find an item…"
              aria-label="Find a registry item"
              className="h-8 pl-8"
            />
          </div>
          <fieldset className={flowSegmentedClassName}>
            <legend className="sr-only">Item types</legend>
            {typeCounts.map(([type, count]) => (
              <button
                key={type}
                type="button"
                aria-pressed={!hiddenTypes.has(type)}
                onClick={() => toggleType(type)}
                className={flowSegmentClassName}
              >
                <RegistryTypeIcon type={type} className="size-3" strokeWidth={1.75} />
                {getRegistryTypeLabel(type)}
                <span className="font-mono font-normal text-muted-foreground">{count}</span>
              </button>
            ))}
          </fieldset>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 bg-muted/30">
        <ReactFlow
          {...flowCanvasDefaults}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          colorMode={colorMode}
          fitView
          fitViewOptions={{ padding: { top: 0.2, left: 0.08, right: 0.35, bottom: 0.1 } }}
          onNodeClick={(_, node) => {
            if (node.type === "item" && node.data.target) {
              select(node.data.target);
            }
          }}
          onPaneClick={() => setInspectorOpen(false)}
        >
          <Background gap={18} size={1.2} color="var(--border)" />
          <Controls position="bottom-left" showInteractive={false} />
          <MiniMap
            position="bottom-left"
            style={{ marginLeft: 56, width: 160, height: 100 }}
            className="hidden sm:block"
            pannable
            zoomable
            nodeBorderRadius={4}
            nodeColor={(node) => {
              if (node.id === active) {
                return "var(--foreground)";
              }

              if (up.has(node.id)) {
                return flowColors.up;
              }

              return down.has(node.id) ? flowColors.down : "var(--border)";
            }}
          />
        </ReactFlow>

        {active ? (
          <FlowInspector
            graph={graph}
            name={active}
            onSelect={select}
            onClose={() => setInspectorOpen(false)}
          />
        ) : (
          <div className="absolute top-3 right-3 z-10 hidden gap-3 rounded-lg border bg-card px-3 py-2 text-xs shadow-xs lg:flex">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full" style={{ background: flowColors.up }} />
              Depends on
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full" style={{ background: flowColors.down }} />
              Used by
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

type FlowInspectorProps = {
  graph: RegistryFlowGraph;
  name: string;
  onSelect: (name: string) => void;
  onClose: () => void;
};

function FlowInspector({ graph, name, onSelect, onClose }: FlowInspectorProps) {
  const item = graph.items.get(name);

  if (!item) {
    return null;
  }

  const upstream = [...getTransitiveNeighbors(graph, name, "up")].toSorted();
  const downstream = [...getTransitiveNeighbors(graph, name, "down")].toSorted();
  const upstreamCount = upstream.length + item.remoteDependencies.length;

  const renderLink = (target: string, direction: RegistryFlowDirection) => {
    const targetItem = graph.items.get(target);
    const via = getVia(graph, name, target, direction);

    return (
      <button
        key={target}
        type="button"
        onClick={() => onSelect(target)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
      >
        {targetItem ? (
          <RegistryTypeIcon
            type={targetItem.type}
            className="size-3.5 shrink-0"
            strokeWidth={1.75}
          />
        ) : (
          <FileCodeIcon className="size-3.5 shrink-0" strokeWidth={1.75} />
        )}
        <span className="truncate">{targetItem?.title ?? target}</span>
        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
          {via ? `via ${via}` : "direct"}
        </span>
      </button>
    );
  };

  return (
    <aside
      aria-label={`${item.title} details`}
      className="absolute inset-x-3 bottom-3 z-20 flex max-h-[55%] animate-in flex-col overflow-hidden rounded-xl border bg-card shadow-xl duration-200 fade-in slide-in-from-right-2 md:inset-x-auto md:top-3 md:right-3 md:max-h-none md:w-80"
    >
      <div className="flex flex-col gap-3 border-b p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className="font-mono">
            <RegistryTypeIcon type={item.type} strokeWidth={1.75} />
            registry:{getRegistryTypeLabel(item.type)}
          </Badge>
          <button
            type="button"
            aria-label="Close details"
            onClick={onClose}
            className="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <XIcon className="size-4" />
          </button>
        </div>
        <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
        <DocsInstallCommand name={name} className="my-0" />
      </div>
      <div className="flex flex-col gap-5 overflow-y-auto p-4">
        <InspectorGroup
          label={`Depends on · ${upstreamCount}`}
          marker={<span className="h-0.5 w-4 rounded-full" style={{ background: flowColors.up }} />}
        >
          {upstream.map((target) => renderLink(target, "up"))}
          {item.remoteDependencies.map((dependency) => (
            <div key={dependency.id} className="flex items-center gap-2 px-2 py-1.5 text-sm">
              <GlobeIcon className="size-3.5 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{dependency.name}</span>
              <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                {dependency.source}
              </span>
            </div>
          ))}
          {upstreamCount === 0 ? <EmptyNote>Nothing — this is a foundation.</EmptyNote> : null}
        </InspectorGroup>
        <InspectorGroup
          label={`Used by · ${downstream.length}`}
          marker={
            <span className="h-0.5 w-4 rounded-full" style={{ background: flowColors.down }} />
          }
        >
          {downstream.map((target) => renderLink(target, "down"))}
          {downstream.length === 0 ? (
            <EmptyNote>No other registry item uses this yet.</EmptyNote>
          ) : null}
        </InspectorGroup>
        <InspectorGroup
          label={`npm · ${item.dependencies.length}`}
          marker={<PackageIcon className="size-3" />}
        >
          <div className="flex flex-wrap gap-1.5 px-2">
            {item.dependencies.map((dependency) => (
              <Badge key={dependency} variant="outline" className="font-mono">
                {dependency}
              </Badge>
            ))}
          </div>
          {item.dependencies.length === 0 ? <EmptyNote>No packages.</EmptyNote> : null}
        </InspectorGroup>
        <InspectorGroup
          label={`Files · ${item.files.length}`}
          marker={<FileCodeIcon className="size-3" />}
        >
          {item.files.map((file) => {
            const { directory, base } = splitFilePath(file);

            return (
              <div key={file} className="px-2 py-0.5 font-mono text-xs break-all">
                <span className="text-muted-foreground">{directory}</span>
                {base}
              </div>
            );
          })}
        </InspectorGroup>
        <Link
          to="/$section/$name"
          params={{ section: getRegistrySectionIdForType(item.type), name }}
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
          Open {item.title} docs
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </aside>
  );
}

function InspectorGroup({
  label,
  marker,
  children,
}: {
  label: string;
  marker: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Collapsible defaultOpen render={<section />}>
      <h3>
        <CollapsibleTrigger className="group/trigger -mx-1 mb-1 flex w-[calc(100%+0.5rem)] items-center gap-1.5 rounded-md px-1 py-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">
          {marker}
          {label}
          <ChevronRightIcon className="ml-auto size-3.5 transition-transform duration-150 group-aria-expanded/trigger:rotate-90" />
        </CollapsibleTrigger>
      </h3>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="px-2 py-0.5 text-xs text-muted-foreground">{children}</p>;
}
