import { ReactFlow, type Edge } from "@xyflow/react";
import { GlobeIcon, PackageIcon, SearchIcon } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  getDependents,
  getFlowRole,
  getLocalDependencies,
  type RegistryFlowGraph,
  type RegistryFlowRole,
} from "@/lib/registry/flow-graph";
import { cn } from "@/lib/utils";

import {
  flowCanvasDefaults,
  flowSegmentClassName,
  flowSegmentedClassName,
  flowSidebarScrollClassName,
  flowToolbarClassName,
  flowToolbarLabelClassName,
  getFlowEdgeStyle,
  type FlowViewProps,
} from "./flow-canvas";
import { FlowItemPicker } from "./flow-item-picker";
import {
  FLOW_FOCUS_WIDTH,
  FlowFocusNodeView,
  FlowItemNodeView,
  FlowLabelNodeView,
  flowColors,
  getRegistryTypeIcon,
  getRegistryTypeLabel,
  type FlowFocusNode,
  type FlowItemNode,
  type FlowLabelNode,
} from "./flow-nodes";

type LanesDirection = "up" | "both" | "down";
type LanesNode = FlowItemNode | FlowLabelNode | FlowFocusNode;

const nodeTypes = {
  item: FlowItemNodeView,
  label: FlowLabelNodeView,
  focus: FlowFocusNodeView,
};

const directionOptions = [
  { value: "up", label: "Depends on" },
  { value: "both", label: "Both" },
  { value: "down", label: "Used by" },
] as const satisfies readonly { value: LanesDirection; label: string }[];

const roleDotClassNames: Record<RegistryFlowRole, string> = {
  shared: "bg-emerald-500",
  composite: "bg-amber-500",
  standalone: "bg-muted-foreground/40",
};

const ROW_HEIGHT = 50;
const COLUMN_X = { up: 0, focus: 270, down: 270 + FLOW_FOCUS_WIDTH + 60 } as const;

type LaneEntry = {
  id: string;
  node: FlowItemNode["data"];
  dashed: boolean;
};

function getUpstreamEntries(graph: RegistryFlowGraph, name: string): LaneEntry[] {
  const item = graph.items.get(name);

  if (!item) {
    return [];
  }

  return [
    ...getLocalDependencies(graph, name).map((dependency) => {
      const dependencyItem = graph.items.get(dependency);
      const count = getLocalDependencies(graph, dependency).length;

      return {
        id: dependency,
        dashed: false,
        node: {
          label: dependencyItem?.title ?? dependency,
          icon: dependencyItem ? getRegistryTypeIcon(dependencyItem.type) : undefined,
          meta: `${count} ${count === 1 ? "dep" : "deps"}`,
          tone: "default",
          target: dependency,
          title: `Trace ${dependencyItem?.title ?? dependency}`,
        },
      } satisfies LaneEntry;
    }),
    ...item.remoteDependencies.map(
      (dependency) =>
        ({
          id: dependency.id,
          dashed: true,
          node: {
            label: dependency.name,
            icon: GlobeIcon,
            meta: dependency.source,
            tone: "remote",
            title: `${dependency.source}/${dependency.name}`,
          },
        }) satisfies LaneEntry,
    ),
    ...item.dependencies.map(
      (dependency) =>
        ({
          id: `npm:${dependency}`,
          dashed: true,
          node: {
            label: dependency,
            icon: PackageIcon,
            meta: "npm",
            tone: "package",
            title: dependency,
          },
        }) satisfies LaneEntry,
    ),
  ];
}

function getDownstreamEntries(graph: RegistryFlowGraph, name: string): LaneEntry[] {
  return getDependents(graph, name).map((dependent) => {
    const dependentItem = graph.items.get(dependent);
    const count = getDependents(graph, dependent).length;

    return {
      id: dependent,
      dashed: false,
      node: {
        label: dependentItem?.title ?? dependent,
        icon: dependentItem ? getRegistryTypeIcon(dependentItem.type) : undefined,
        meta: `${count} ${count === 1 ? "use" : "uses"}`,
        tone: "default",
        target: dependent,
        title: `Trace ${dependentItem?.title ?? dependent}`,
      },
    };
  });
}

function buildLanes(graph: RegistryFlowGraph, name: string, direction: LanesDirection) {
  const item = graph.items.get(name);
  const showUp = direction !== "down";
  const showDown = direction !== "up";
  const upEntries = showUp ? getUpstreamEntries(graph, name) : [];
  const downEntries = showDown ? getDownstreamEntries(graph, name) : [];
  const focusHeight = 52 + (item?.files.length ?? 0) * 19;
  const rows = Math.max(
    upEntries.length,
    downEntries.length,
    Math.ceil(focusHeight / ROW_HEIGHT),
    1,
  );
  const totalHeight = rows * ROW_HEIGHT;
  const nodes: LanesNode[] = [];
  const edges: Edge[] = [];

  const placeColumn = (entries: LaneEntry[], side: "up" | "down") => {
    const x = COLUMN_X[side];

    if (entries.length === 0) {
      nodes.push({
        id: `empty-${side}`,
        type: "item",
        position: { x, y: totalHeight / 2 - 19 },
        data: {
          label: side === "up" ? "No dependencies" : "Not used by other items",
          tone: "empty",
        },
      });
      return;
    }

    const top = (totalHeight - entries.length * ROW_HEIGHT) / 2;
    const stroke = side === "up" ? flowColors.up : flowColors.down;

    entries.forEach((entry, index) => {
      nodes.push({
        id: entry.id,
        type: "item",
        position: { x, y: top + index * ROW_HEIGHT },
        data: entry.node,
      });
      edges.push({
        id: `${side}:${entry.id}`,
        source: side === "up" ? entry.id : name,
        target: side === "up" ? name : entry.id,
        style: getFlowEdgeStyle(
          stroke,
          entry.dashed ? { strokeDasharray: "4 4", opacity: 0.6 } : {},
        ),
      });
    });
  };

  if (showUp) {
    placeColumn(upEntries, "up");
    nodes.push({
      id: "label-up",
      type: "label",
      position: { x: COLUMN_X.up, y: -36 },
      data: { label: "Depends on" },
    });
  }

  if (showDown) {
    placeColumn(downEntries, "down");
    nodes.push({
      id: "label-down",
      type: "label",
      position: { x: COLUMN_X.down, y: -36 },
      data: { label: "Used by" },
    });
  }

  if (item) {
    nodes.push(
      {
        id: name,
        type: "focus",
        position: { x: COLUMN_X.focus, y: (totalHeight - focusHeight) / 2 },
        data: { title: item.title, type: item.type, files: item.files },
      },
      {
        id: "label-focus",
        type: "label",
        position: { x: COLUMN_X.focus, y: -36 },
        data: { label: "Component · installs to", width: FLOW_FOCUS_WIDTH },
      },
    );
  }

  return { nodes, edges, height: Math.max(280, totalHeight + 120) };
}

export function FlowLanesView({ graph, selected, onSelect, colorMode, header }: FlowViewProps) {
  const [query, setQuery] = React.useState("");
  const [direction, setDirection] = React.useState<LanesDirection>("both");
  const item = graph.items.get(selected);
  const { nodes, edges, height } = React.useMemo(
    () => buildLanes(graph, selected, direction),
    [graph, selected, direction],
  );
  const normalizedQuery = query.trim().toLowerCase();
  const visibleNames = graph.names.filter((name) => {
    const title = graph.items.get(name)?.title.toLowerCase() ?? "";

    return name.includes(normalizedQuery) || title.includes(normalizedQuery);
  });

  if (!item) {
    return null;
  }

  const stats = [
    ["Depends on", getLocalDependencies(graph, selected).length + item.remoteDependencies.length],
    ["Used by", getDependents(graph, selected).length],
    ["Packages", item.dependencies.length],
    ["Files", item.files.length],
  ] as const;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:-mt-6 md:-ml-6 md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="hidden flex-col gap-3 border-r bg-muted/30 p-3 md:sticky md:top-16 md:flex md:h-[calc(100svh-4rem)] md:self-start">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search items"
            aria-label="Search registry items"
            className="pl-8"
          />
        </div>
        <div className="flex items-center justify-between px-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          <span>Registry items</span>
          <span>{visibleNames.length}</span>
        </div>
        <div className="no-scrollbar flex min-w-0 shrink-0 scroll-fade-x gap-3 overflow-x-auto overscroll-x-contain px-1 text-xs whitespace-nowrap text-muted-foreground [--scroll-fade-reveal:1px]">
          {(["shared", "composite", "standalone"] as const).map((role) => (
            <span key={role} className="inline-flex flex-none items-center gap-1.5 capitalize">
              <span className={cn("size-1.5 rounded-full", roleDotClassNames[role])} />
              {role}
            </span>
          ))}
        </div>
        <nav
          aria-label="Registry items"
          className={cn(
            "-mx-1 flex min-h-0 flex-col gap-px overflow-y-auto px-1",
            flowSidebarScrollClassName,
          )}
        >
          {visibleNames.map((name) => {
            const entry = graph.items.get(name);
            const isCurrent = name === selected;

            return (
              <button
                key={name}
                type="button"
                aria-current={isCurrent}
                onClick={() => onSelect(name)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted",
                  isCurrent && "border-border bg-card font-medium shadow-xs hover:bg-card",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    roleDotClassNames[getFlowRole(graph, name)],
                  )}
                />
                <span className="truncate">{entry?.title ?? name}</span>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {getLocalDependencies(graph, name).length + getDependents(graph, name).length}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-col gap-4 pb-6 md:pt-6">
        {header ? <div className="mb-2">{header}</div> : null}
        <FlowItemPicker
          graph={graph}
          value={selected}
          onValueChange={onSelect}
          className="md:hidden"
        />

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card px-5 py-4">
          <div>
            <div className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              registry:{getRegistryTypeLabel(item.type)}
            </div>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">{item.title}</h2>
          </div>
          <dl className="flex gap-6 sm:gap-8">
            {stats.map(([label, value]) => (
              <div key={label} className="text-right">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="font-mono text-2xl leading-tight">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="overflow-hidden rounded-xl border bg-card">
          <div className={flowToolbarClassName}>
            <span className={flowToolbarLabelClassName}>
              How it flows · <span className="normal-case">click an item to trace it</span>
            </span>
            <fieldset className={flowSegmentedClassName}>
              <legend className="sr-only">Direction</legend>
              {directionOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={direction === option.value}
                  onClick={() => setDirection(option.value)}
                  className={flowSegmentClassName}
                >
                  {option.label}
                </button>
              ))}
            </fieldset>
          </div>
          <div className="bg-muted/30" style={{ height }}>
            <ReactFlow
              key={`${selected}-${direction}`}
              {...flowCanvasDefaults}
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              colorMode={colorMode}
              fitView
              fitViewOptions={{ padding: 0.15, maxZoom: 1 }}
              zoomOnScroll={false}
              preventScrolling={false}
              onNodeClick={(_, node) => {
                if (node.type === "item" && node.data.target) {
                  onSelect(node.data.target);
                }
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
