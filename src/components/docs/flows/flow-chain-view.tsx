import { Background, Controls, ReactFlow, type Edge } from "@xyflow/react";
import { ArrowDownIcon, GlobeIcon, PackageIcon, TerminalIcon } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  getDependents,
  getFlowLayers,
  getInstallOrder,
  getInstallPackages,
  getInstallStepId,
  getLocalDependencies,
  type RegistryFlowGraph,
  type RegistryFlowInstallStep,
} from "@/lib/registry/flow-graph";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { DocsInstallCommand } from "../install-command";
import {
  flowCanvasDefaults,
  flowSidebarScrollClassName,
  getFlowEdgeStyle,
  type FlowViewProps,
} from "./flow-canvas";
import { FlowItemPicker } from "./flow-item-picker";
import {
  FLOW_CHAIN_WIDTH,
  FlowChainNodeView,
  estimateChainNodeHeight,
  flowColors,
  getRegistryTypeIcon,
  getRegistryTypeLabel,
  RegistryTypeIcon,
  type FlowChainNode,
} from "./flow-nodes";

type ChainMode = "installs" | "dependents";

const nodeTypes = { chain: FlowChainNodeView };
const ROOT_ID = "chain:root";
const NPM_ID = "chain:npm";
const COLUMN_GAP = FLOW_CHAIN_WIDTH + 40;
const LAYER_GAP = 70;
const ROW_GAP = 24;
const MAX_ROW_NODES = 3;

type ChainNodeSpec = Omit<FlowChainNode["data"], "hot">;

type ChainModel = {
  layers: Map<string, number>;
  specs: Map<string, ChainNodeSpec>;
  edges: Edge[];
};

function getItemSpec(
  graph: RegistryFlowGraph,
  name: string,
  overrides: Partial<ChainNodeSpec>,
): ChainNodeSpec {
  const item = graph.items.get(name);

  return {
    label: item?.title ?? name,
    icon: item ? getRegistryTypeIcon(item.type) : PackageIcon,
    kind: `registry:${item ? getRegistryTypeLabel(item.type) : "item"}`,
    lines: [],
    variant: "item",
    target: name,
    ...overrides,
  };
}

function buildInstallChain(
  graph: RegistryFlowGraph,
  name: string,
  steps: readonly RegistryFlowInstallStep[],
  packages: readonly string[],
): ChainModel {
  const stepNumbers = new Map(steps.map((step, index) => [getInstallStepId(step), index + 1]));
  const layers = new Map<string, number>([[ROOT_ID, 0]]);
  const specs = new Map<string, ChainNodeSpec>();
  const edges: Edge[] = [{ id: `${ROOT_ID}->${name}`, source: ROOT_ID, target: name }];

  const itemLayers = getFlowLayers(graph, name, "up");

  for (const [itemName, layer] of itemLayers) {
    layers.set(itemName, layer + 1);
  }

  for (const [itemName, itemLayer] of itemLayers) {
    const layer = itemLayer + 1;
    const item = graph.items.get(itemName);

    specs.set(
      itemName,
      getItemSpec(graph, itemName, {
        kind: `registry:${item ? getRegistryTypeLabel(item.type) : "item"} · ${itemName === name ? "requested" : "dependency"}`,
        lines: item?.files ?? [],
        linesArePaths: true,
        step: stepNumbers.get(itemName),
      }),
    );

    for (const dependency of getLocalDependencies(graph, itemName)) {
      edges.push({ id: `${itemName}->${dependency}`, source: itemName, target: dependency });
    }

    for (const dependency of item?.remoteDependencies ?? []) {
      layers.set(dependency.id, Math.max(layers.get(dependency.id) ?? 0, layer + 1));
      specs.set(dependency.id, {
        label: dependency.name,
        icon: GlobeIcon,
        kind: `remote · ${dependency.source}`,
        lines: [],
        variant: "remote",
        step: stepNumbers.get(dependency.id),
      });
      edges.push({ id: `${itemName}->${dependency.id}`, source: itemName, target: dependency.id });
    }
  }

  specs.set(ROOT_ID, {
    label: `shadcn add ${siteConfig.namespace}/${name}`,
    icon: TerminalIcon,
    kind: "you run",
    lines: [],
    variant: "root",
  });

  if (packages.length > 0) {
    const lastLayer = Math.max(...layers.values());

    for (const [id, layer] of layers) {
      if (layer === lastLayer) {
        edges.push({
          id: `${id}->${NPM_ID}`,
          source: id,
          target: NPM_ID,
          style: getFlowEdgeStyle(flowColors.neutral, { strokeDasharray: "4 4", opacity: 0.6 }),
        });
      }
    }

    layers.set(NPM_ID, lastLayer + 1);
    specs.set(NPM_ID, {
      label: `npm install · ${packages.length}`,
      icon: PackageIcon,
      kind: "then",
      lines: packages,
      variant: "sink",
    });
  }

  return { layers, specs, edges };
}

function buildDependentsChain(graph: RegistryFlowGraph, name: string): ChainModel {
  const layers = getFlowLayers(graph, name, "down");
  const specs = new Map<string, ChainNodeSpec>();
  const edges: Edge[] = [];

  for (const [itemName, layer] of layers) {
    specs.set(
      itemName,
      getItemSpec(graph, itemName, {
        kind: itemName === name ? "you change" : `affected · depth ${layer}`,
        variant: itemName === name ? "root" : "item",
        target: itemName === name ? undefined : itemName,
      }),
    );

    for (const dependent of getDependents(graph, itemName)) {
      if (layers.has(dependent)) {
        edges.push({
          id: `${itemName}->${dependent}`,
          source: itemName,
          target: dependent,
          style: getFlowEdgeStyle(flowColors.down),
        });
      }
    }
  }

  return { layers, specs, edges };
}

function layoutChain({ layers, specs, edges }: ChainModel, hot: string | null) {
  const byLayer: string[][] = [];

  for (const [id, layer] of layers) {
    byLayer[layer] = [...(byLayer[layer] ?? []), id];
  }

  const nodes: FlowChainNode[] = [];
  let y = 0;

  for (const ids of byLayer) {
    const sorted = (ids ?? []).toSorted();

    for (let start = 0; start < sorted.length; start += MAX_ROW_NODES) {
      const row = sorted.slice(start, start + MAX_ROW_NODES);
      let rowHeight = 0;

      row.forEach((id, index) => {
        const spec = specs.get(id);

        if (!spec) {
          return;
        }

        rowHeight = Math.max(rowHeight, estimateChainNodeHeight(spec.lines.length));
        nodes.push({
          id,
          type: "chain",
          position: { x: (index - (row.length - 1) / 2) * COLUMN_GAP, y },
          data: { ...spec, hot: hot === id },
        });
      });

      y += rowHeight + (start + MAX_ROW_NODES < sorted.length ? ROW_GAP : LAYER_GAP);
    }
  }

  return {
    nodes,
    edges: edges.map((edge) => ({
      type: "smoothstep",
      pathOptions: { borderRadius: 12 },
      style: getFlowEdgeStyle(flowColors.neutral),
      ...edge,
    })),
  };
}

export function FlowChainView({ graph, selected, onSelect, colorMode, header }: FlowViewProps) {
  const [mode, setMode] = React.useState<ChainMode>("installs");
  const [hot, setHot] = React.useState<string | null>(null);
  const item = graph.items.get(selected);
  const steps = React.useMemo(() => getInstallOrder(graph, selected), [graph, selected]);
  const packages = React.useMemo(() => getInstallPackages(graph, steps), [graph, steps]);
  const model = React.useMemo(
    () =>
      mode === "installs"
        ? buildInstallChain(graph, selected, steps, packages)
        : buildDependentsChain(graph, selected),
    [graph, selected, mode, steps, packages],
  );
  const { nodes, edges } = React.useMemo(() => layoutChain(model, hot), [model, hot]);

  if (!item) {
    return null;
  }

  const affected = [...model.layers]
    .filter(([name]) => name !== selected)
    .toSorted(([nameA, layerA], [nameB, layerB]) => layerA - layerB || nameA.localeCompare(nameB));
  const fileCount = steps.reduce(
    (total, step) =>
      step.kind === "item" ? total + (graph.items.get(step.name)?.files.length ?? 0) : total,
    0,
  );
  const totals =
    mode === "installs"
      ? [
          ["Items", steps.length],
          ["Packages", packages.length],
          ["Files", fileCount],
        ]
      : [
          ["Affected", affected.length],
          ["Direct", getDependents(graph, selected).length],
          ["Max depth", Math.max(0, ...model.layers.values())],
        ];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 pb-6 lg:-mt-6 lg:-ml-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:pb-0">
      <aside
        className={cn(
          "flex flex-col gap-5 rounded-xl border p-5 *:shrink-0 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:self-start lg:overflow-y-auto lg:rounded-none lg:border-0 lg:border-r lg:bg-muted/30",
          flowSidebarScrollClassName,
        )}
      >
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Registry item
          </span>
          <FlowItemPicker graph={graph} value={selected} onValueChange={onSelect} />
        </div>

        <div className="flex flex-col items-start gap-2">
          <Badge variant="outline" className="font-mono">
            <RegistryTypeIcon type={item.type} strokeWidth={1.75} />
            registry:{getRegistryTypeLabel(item.type)}
          </Badge>
          <h2 className="text-4xl leading-none font-semibold tracking-tighter">{item.title}</h2>
          <p className="text-sm text-muted-foreground">
            {mode === "installs"
              ? `Everything the CLI pulls in when someone installs ${item.title}, in order.`
              : `Every registry item affected when you change ${item.title}.`}
          </p>
        </div>

        <fieldset className="inline-flex self-start rounded-lg border p-0.5">
          <legend className="sr-only">Flow direction</legend>
          {(
            [
              ["installs", "What it installs"],
              ["dependents", "What depends on it"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className="rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-muted aria-pressed:font-medium aria-pressed:text-foreground"
            >
              {label}
            </button>
          ))}
        </fieldset>

        {mode === "installs" ? <DocsInstallCommand name={selected} className="my-0" /> : null}

        <dl className="grid grid-cols-3 divide-x overflow-hidden rounded-lg border">
          {totals.map(([label, value]) => (
            <div key={label} className="flex flex-col-reverse px-3 py-2.5">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="font-mono text-xl">{value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <h3 className="mb-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            {mode === "installs" ? "Install order" : "Impact"}
          </h3>
          <ol className="flex flex-col">
            {mode === "installs" ? (
              <>
                {steps.map((step, index) => {
                  const id = getInstallStepId(step);
                  const isRequested = id === selected;

                  return (
                    <ChainStep
                      key={id}
                      id={id}
                      hot={hot}
                      onHot={setHot}
                      number={index + 1}
                      emphasized={isRequested}
                      onSelect={step.kind === "item" ? () => onSelect(step.name) : undefined}
                      label={
                        step.kind === "remote"
                          ? step.dependency.name
                          : (graph.items.get(step.name)?.title ?? step.name)
                      }
                      kind={
                        step.kind === "remote"
                          ? "remote"
                          : isRequested
                            ? "requested"
                            : getRegistryTypeLabel(
                                graph.items.get(step.name)?.type ?? "registry:item",
                              )
                      }
                    />
                  );
                })}
                {packages.length > 0 ? (
                  <ChainStep
                    id={NPM_ID}
                    hot={hot}
                    onHot={setHot}
                    number={<PackageIcon className="size-3" />}
                    label="npm install"
                    kind={`${packages.length} ${packages.length === 1 ? "pkg" : "pkgs"}`}
                  />
                ) : null}
              </>
            ) : (
              <>
                <ChainStep
                  id={selected}
                  hot={hot}
                  onHot={setHot}
                  number={0}
                  emphasized
                  label={item.title}
                  kind="source"
                />
                {affected.map(([name], index) => (
                  <ChainStep
                    key={name}
                    id={name}
                    hot={hot}
                    onHot={setHot}
                    number={index + 1}
                    onSelect={() => onSelect(name)}
                    label={graph.items.get(name)?.title ?? name}
                    kind={getRegistryTypeLabel(graph.items.get(name)?.type ?? "registry:item")}
                  />
                ))}
              </>
            )}
          </ol>
          {mode === "dependents" && affected.length === 0 ? (
            <p className="mt-1 px-2 text-xs text-muted-foreground">
              Safe to change — nothing else in the registry uses {item.title}.
            </p>
          ) : null}
        </div>
      </aside>

      <div className="contents lg:flex lg:h-[calc(100svh-4rem)] lg:min-w-0 lg:flex-col lg:gap-6 lg:py-6">
        {header ? <div className="order-first lg:order-none">{header}</div> : null}
        <section className="relative h-[min(780px,calc(100svh-13rem))] min-h-120 overflow-hidden rounded-xl border bg-muted/30 lg:h-auto lg:min-h-0 lg:flex-1">
          <Badge variant="outline" className="absolute top-3 left-3 z-10 bg-card font-mono">
            <ArrowDownIcon />
            {mode === "installs" ? "top → bottom: resolve order" : "top → bottom: blast radius"}
          </Badge>
          <ReactFlow
            key={`${selected}-${mode}`}
            {...flowCanvasDefaults}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            colorMode={colorMode}
            fitView
            fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
            onNodeMouseEnter={(_, node) => setHot(node.id)}
            onNodeMouseLeave={() => setHot(null)}
            onNodeClick={(_, node) => {
              if (node.data.target && node.data.target !== selected) {
                onSelect(node.data.target);
              }
            }}
          >
            <Background gap={20} size={1.2} color="var(--border)" />
            <Controls position="bottom-right" showInteractive={false} />
          </ReactFlow>
        </section>
      </div>
    </div>
  );
}

type ChainStepProps = {
  id: string;
  hot: string | null;
  onHot: (id: string | null) => void;
  number: React.ReactNode;
  label: string;
  kind: string;
  emphasized?: boolean;
  onSelect?: () => void;
};

function ChainStep({
  id,
  hot,
  onHot,
  number,
  label,
  kind,
  emphasized = false,
  onSelect,
}: ChainStepProps) {
  const className = cn(
    "grid w-full grid-cols-[1.625rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm",
    hot === id && "bg-muted",
  );
  const content = (
    <>
      <span
        className={cn(
          "grid size-5.5 place-items-center rounded-full border bg-card font-mono text-[11px]",
          emphasized && "border-primary bg-primary text-primary-foreground",
        )}
      >
        {number}
      </span>
      <span className="truncate">{label}</span>
      <span className="font-mono text-[11px] text-muted-foreground">{kind}</span>
    </>
  );

  return (
    <li>
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          onMouseEnter={() => onHot(id)}
          onMouseLeave={() => onHot(null)}
          onFocus={() => onHot(id)}
          onBlur={() => onHot(null)}
          className={cn(className, "outline-none focus-visible:ring-3 focus-visible:ring-ring/50")}
        >
          {content}
        </button>
      ) : (
        <div className={className}>{content}</div>
      )}
    </li>
  );
}
