import {
  Background,
  BaseEdge,
  Controls,
  ReactFlow,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";
import {
  ArrowDownIcon,
  GlobeIcon,
  ListTreeIcon,
  PackageIcon,
  SlidersHorizontalIcon,
  TerminalIcon,
  type LucideIcon,
} from "lucide-react";
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
  FLOW_CHAIN_WIDTH,
  FLOW_PROP_WIDTH,
  FlowChainHotContext,
  FlowPropToggleContext,
  FlowChainNodeView,
  FlowPropNodeView,
  estimateChainNodeHeight,
  estimatePropNodeHeight,
  flowColors,
  getApiSummary,
  getRegistryTypeIcon,
  getRegistryTypeLabel,
  RegistryTypeIcon,
  type FlowChainNode,
  type FlowPropNode,
  type FlowPropNodeData,
} from "./flow-nodes";
import { FlowPropsPanel } from "./flow-props-panel";

type ChainMode = "installs" | "dependents";

const nodeTypes = { chain: FlowChainNodeView, prop: FlowPropNodeView };
const edgeTypes = { chain: FlowChainEdgeView };
const ROOT_ID = "chain:root";
const NPM_ID = "chain:npm";
const COLUMN_GAP = FLOW_CHAIN_WIDTH + 40;
const LAYER_GAP = 70;
const ROW_GAP = 24;
const MAX_ROW_NODES = 3;
const PROP_GAP = 88;
const PROP_STACK_GAP = 14;

type ChainNodeSpec = FlowChainNode["data"];

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
    apiSummary: item ? getApiSummary(item.api) : undefined,
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

type PropSpec = Omit<FlowPropNodeData, "expanded"> & { id: string };

function getPropSpecs(graph: RegistryFlowGraph, ids: Iterable<string>): Map<string, PropSpec[]> {
  const propSpecs = new Map<string, PropSpec[]>();

  for (const owner of ids) {
    const api = graph.items.get(owner)?.api;

    if (!api) {
      continue;
    }

    const specs: PropSpec[] = api.variants.map((variant) => ({
      id: `prop:${owner}:${variant.name}`,
      owner,
      label: variant.name,
      rows: variant.options.map((option) => ({
        label: option,
        isDefault: option === variant.defaultValue,
      })),
    }));

    if (api.props.length > 0) {
      specs.push({
        id: `prop:${owner}:*`,
        owner,
        label: "props",
        rows: api.props.map((prop) => ({
          label: `${prop.name}${prop.optional ? "?" : ""}`,
          detail: prop.defaultValue === undefined ? prop.type : `= ${prop.defaultValue}`,
        })),
      });
    }

    if (specs.length > 0) {
      propSpecs.set(owner, specs);
    }
  }

  return propSpecs;
}

function layoutChain(
  { layers, specs, edges }: ChainModel,
  propSpecs: ReadonlyMap<string, readonly PropSpec[]> | undefined,
  expandedProps: ReadonlySet<string>,
) {
  const byLayer: string[][] = [];

  for (const [id, layer] of layers) {
    byLayer[layer] = [...(byLayer[layer] ?? []), id];
  }

  const columnGap = propSpecs ? COLUMN_GAP + PROP_GAP + FLOW_PROP_WIDTH : COLUMN_GAP;
  const nodes: (FlowChainNode | FlowPropNode)[] = [];
  const propEdges: Edge[] = [];
  // Turning each edge inside the gap above its target row keeps horizontal
  // runs clear of prop stacks, which make rows taller than their chain nodes.
  const turnY = new Map<string, number>();
  let y = 0;
  let gapAbove = 0;

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

        if (gapAbove > 0) {
          turnY.set(id, y - gapAbove / 2);
        }

        const x = (index - (row.length - 1) / 2) * columnGap;
        const ownProps = propSpecs?.get(id) ?? [];
        let propY = y;

        rowHeight = Math.max(
          rowHeight,
          estimateChainNodeHeight(spec.lines.length, !propSpecs && Boolean(spec.apiSummary)),
        );
        nodes.push({
          id,
          type: "chain",
          position: { x, y },
          data: propSpecs ? { ...spec, apiSummary: undefined } : spec,
        });

        for (const { id: propId, ...propData } of ownProps) {
          const expanded = expandedProps.has(propId);

          nodes.push({
            id: propId,
            type: "prop",
            position: { x: x + FLOW_CHAIN_WIDTH + PROP_GAP, y: propY },
            data: { ...propData, expanded },
          });
          propEdges.push({
            id: `${id}->${propId}`,
            source: id,
            sourceHandle: "props",
            target: propId,
            type: "default",
            style: getFlowEdgeStyle(flowColors.neutral, { opacity: 0.45 }),
          });
          propY += estimatePropNodeHeight(propData.rows.length, expanded) + PROP_STACK_GAP;
        }

        rowHeight = Math.max(rowHeight, propY - y - PROP_STACK_GAP);
      });

      gapAbove = start + MAX_ROW_NODES < sorted.length ? ROW_GAP : LAYER_GAP;
      y += rowHeight + gapAbove;
    }
  }

  return {
    nodes,
    edges: [
      ...edges.map(
        (edge): ChainEdge => ({
          style: getFlowEdgeStyle(flowColors.neutral),
          ...edge,
          type: "chain",
          data: { turnY: turnY.get(edge.target) },
        }),
      ),
      ...propEdges,
    ],
  };
}

type ChainEdge = Edge<{ turnY?: number }, "chain">;

function FlowChainEdgeView({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  data,
}: EdgeProps<ChainEdge>) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
    centerY: data?.turnY !== undefined && data.turnY > sourceY ? data.turnY : undefined,
  });

  return <BaseEdge path={path} style={style} markerEnd={markerEnd} />;
}

export function FlowChainView({ graph, selected, onSelect, colorMode, header }: FlowViewProps) {
  const [mode, setMode] = React.useState<ChainMode>("installs");
  const [hot, setHot] = React.useState<string | null>(null);
  // Only canvas hover previews another item's props. Previewing from the
  // install list would resize the panel above it and shift the hovered row.
  const [previewName, setPreviewName] = React.useState<string | null>(null);
  const item = graph.items.get(selected);
  const propsItem = (previewName ? graph.items.get(previewName) : undefined) ?? item;
  const steps = React.useMemo(() => getInstallOrder(graph, selected), [graph, selected]);
  const packages = React.useMemo(() => getInstallPackages(graph, steps), [graph, steps]);
  const model = React.useMemo(
    () =>
      mode === "installs"
        ? buildInstallChain(graph, selected, steps, packages)
        : buildDependentsChain(graph, selected),
    [graph, selected, mode, steps, packages],
  );
  const [showProps, setShowProps] = React.useState(true);
  const [expandedProps, setExpandedProps] = React.useState<ReadonlySet<string>>(new Set());
  const propSpecs = React.useMemo(() => getPropSpecs(graph, model.layers.keys()), [graph, model]);
  const propIds = [...propSpecs.values()].flat().map((spec) => spec.id);
  const optionCount = [...propSpecs.values()]
    .flat()
    .reduce((total, spec) => total + spec.rows.length, 0);
  const propsShown = showProps && propIds.length > 0;
  const allExpanded = propIds.length > 0 && propIds.every((id) => expandedProps.has(id));
  const { nodes, edges } = React.useMemo(
    () => layoutChain(model, propsShown ? propSpecs : undefined, expandedProps),
    [model, propsShown, propSpecs, expandedProps],
  );
  const toggleProp = React.useCallback((id: string) => {
    setExpandedProps((current) => {
      const next = new Set(current);

      if (!next.delete(id)) {
        next.add(id);
      }

      return next;
    });
  }, []);
  const setAllExpanded = (expanded: boolean) => {
    setExpandedProps((current) => {
      const next = new Set(current);

      for (const id of propIds) {
        if (expanded) {
          next.add(id);
        } else {
          next.delete(id);
        }
      }

      return next;
    });
  };

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

        {propsItem ? (
          <FlowPropsPanel item={propsItem} previewing={propsItem.name !== selected} />
        ) : null}

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
        <section className="flex h-[min(780px,calc(100svh-13rem))] min-h-120 flex-col overflow-hidden rounded-xl border bg-card lg:h-auto lg:min-h-0 lg:flex-1">
          <div className={flowToolbarClassName}>
            <span className={cn(flowToolbarLabelClassName, "inline-flex items-center gap-1.5")}>
              <ArrowDownIcon className="size-3" />
              {mode === "installs" ? "Install order" : "Impact"} ·{" "}
              <span className="normal-case">
                {mode === "installs" ? "top → bottom: resolve order" : "top → bottom: blast radius"}
              </span>
            </span>
            {propIds.length > 0 ? (
              <fieldset className={flowSegmentedClassName}>
                <legend className="sr-only">Canvas details</legend>
                <CanvasToggle
                  pressed={showProps}
                  onPressedChange={setShowProps}
                  icon={SlidersHorizontalIcon}
                  label="Props"
                  count={propIds.length}
                />
                <CanvasToggle
                  pressed={allExpanded}
                  onPressedChange={setAllExpanded}
                  disabled={!showProps}
                  icon={ListTreeIcon}
                  label="Options"
                  count={optionCount}
                />
              </fieldset>
            ) : null}
          </div>
          <div className="min-h-0 flex-1 bg-muted/30">
            <FlowChainHotContext value={hot}>
              <FlowPropToggleContext value={toggleProp}>
                <ReactFlow
                  key={`${selected}-${mode}-${propsShown}`}
                  {...flowCanvasDefaults}
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  colorMode={colorMode}
                  fitView
                  fitViewOptions={{
                    padding: { top: "24px", bottom: "24px", x: "24px" },
                    maxZoom: 1,
                  }}
                  onNodeMouseEnter={(_, node) => {
                    const id = node.type === "prop" ? node.data.owner : node.id;

                    setHot(id);
                    setPreviewName(graph.items.has(id) ? id : null);
                  }}
                  onNodeMouseLeave={() => {
                    setHot(null);
                    setPreviewName(null);
                  }}
                  onNodeClick={(_, node) => {
                    if (
                      node.type === "chain" &&
                      node.data.target &&
                      node.data.target !== selected
                    ) {
                      onSelect(node.data.target);
                    }
                  }}
                >
                  <Background gap={20} size={1.2} color="var(--border)" />
                  <Controls position="bottom-right" showInteractive={false} />
                </ReactFlow>
              </FlowPropToggleContext>
            </FlowChainHotContext>
          </div>
        </section>
      </div>
    </div>
  );
}

type CanvasToggleProps = {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  icon: LucideIcon;
  label: string;
  count: number;
  disabled?: boolean;
};

function CanvasToggle({
  pressed,
  onPressedChange,
  icon: Icon,
  label,
  count,
  disabled = false,
}: CanvasToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed && !disabled}
      disabled={disabled}
      onClick={() => onPressedChange(!pressed)}
      className={flowSegmentClassName}
    >
      <Icon className="size-3" strokeWidth={1.75} />
      {label}
      <span className="font-mono font-normal text-muted-foreground">{count}</span>
    </button>
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
