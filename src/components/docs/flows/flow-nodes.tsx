import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import {
  BoxIcon,
  BracesIcon,
  ChevronRightIcon,
  ComponentIcon,
  FileCodeIcon,
  LayersIcon,
  PaletteIcon,
  SlidersHorizontalIcon,
  ZapIcon,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import * as React from "react";

import type { RegistryFlowApi } from "@/lib/registry/flow-data";
import type { RegistryItemType } from "@/lib/registry/item-types";
import { cn } from "@/lib/utils";

export const flowColors = {
  up: "oklch(0.62 0.17 252)",
  down: "oklch(0.72 0.16 65)",
  neutral: "var(--muted-foreground)",
  faint: "var(--border)",
} as const;

const registryTypeIcons: Partial<Record<RegistryItemType, LucideIcon>> = {
  "registry:ui": ComponentIcon,
  "registry:component": ComponentIcon,
  "registry:block": LayersIcon,
  "registry:hook": ZapIcon,
  "registry:lib": BracesIcon,
  "registry:file": FileCodeIcon,
  "registry:page": FileCodeIcon,
  "registry:style": PaletteIcon,
  "registry:theme": PaletteIcon,
};

export function getRegistryTypeIcon(type: RegistryItemType): LucideIcon {
  return registryTypeIcons[type] ?? BoxIcon;
}

export function RegistryTypeIcon({ type, ...props }: LucideProps & { type: RegistryItemType }) {
  const Icon = registryTypeIcons[type] ?? BoxIcon;

  return <Icon {...props} />;
}

export function getRegistryTypeLabel(type: RegistryItemType): string {
  return type.replace("registry:", "");
}

export function splitFilePath(path: string): { directory: string; base: string } {
  const index = path.lastIndexOf("/");

  return index === -1
    ? { directory: "", base: path }
    : { directory: path.slice(0, index + 1), base: path.slice(index + 1) };
}

const hiddenHandleStyle: React.CSSProperties = { opacity: 0, pointerEvents: "none" };

export type FlowTone = "default" | "focus" | "up" | "down" | "dim" | "package" | "remote" | "empty";

const toneClassNames: Record<FlowTone, string> = {
  default: "border-border bg-card",
  focus: "border-primary bg-primary text-primary-foreground shadow-lg",
  up: "border-blue-500/45 bg-blue-500/10",
  down: "border-amber-500/50 bg-amber-500/10",
  dim: "border-border bg-card opacity-30",
  package: "border-border bg-muted font-mono text-xs shadow-none",
  remote: "border-dashed border-border bg-muted font-mono text-xs shadow-none",
  empty:
    "justify-center border-dashed border-border bg-transparent text-muted-foreground shadow-none",
};

export const FLOW_ITEM_WIDTH = 220;
export const FLOW_ITEM_HEIGHT = 38;

export type FlowItemNodeData = {
  label: string;
  icon?: LucideIcon;
  meta?: string;
  tone: FlowTone;
  target?: string;
  title?: string;
};

export type FlowItemNode = Node<FlowItemNodeData, "item">;

export function FlowItemNodeView({ data }: NodeProps<FlowItemNode>) {
  const Icon = data.icon;

  return (
    <div
      title={data.title}
      style={{ width: FLOW_ITEM_WIDTH }}
      className={cn(
        "flex h-9.5 items-center gap-2 rounded-lg border px-3 text-[13px] shadow-xs transition-[opacity,background-color,border-color,translate] duration-150",
        toneClassNames[data.tone],
        data.target && "cursor-pointer hover:-translate-y-px hover:border-ring",
      )}
    >
      <Handle type="target" position={Position.Left} style={hiddenHandleStyle} />
      {Icon ? <Icon className="size-3.5 shrink-0" strokeWidth={1.75} /> : null}
      <span className="truncate">{data.label}</span>
      {data.meta ? (
        <span
          className={cn(
            "ml-auto shrink-0 font-mono text-[11px]",
            data.tone === "focus" ? "text-primary-foreground/60" : "text-muted-foreground",
          )}
        >
          {data.meta}
        </span>
      ) : null}
      <Handle type="source" position={Position.Right} style={hiddenHandleStyle} />
    </div>
  );
}

export type FlowLabelNodeData = { label: string; width?: number };

export type FlowLabelNode = Node<FlowLabelNodeData, "label">;

export function FlowLabelNodeView({ data }: NodeProps<FlowLabelNode>) {
  return (
    <div
      style={{ width: data.width ?? FLOW_ITEM_WIDTH }}
      className="pointer-events-none font-mono text-[11px] tracking-wider text-muted-foreground uppercase"
    >
      {data.label}
    </div>
  );
}

export type FlowFocusNodeData = {
  title: string;
  type: RegistryItemType;
  files: readonly string[];
};

export type FlowFocusNode = Node<FlowFocusNodeData, "focus">;

export const FLOW_FOCUS_WIDTH = 240;

export function FlowFocusNodeView({ data }: NodeProps<FlowFocusNode>) {
  return (
    <div
      style={{ width: FLOW_FOCUS_WIDTH }}
      className="flex flex-col gap-2 rounded-lg border border-primary bg-primary px-3.5 py-3 text-[13px] text-primary-foreground shadow-lg"
    >
      <Handle type="target" position={Position.Left} style={hiddenHandleStyle} />
      <div className="flex items-center gap-2">
        <RegistryTypeIcon type={data.type} className="size-3.5 shrink-0" strokeWidth={1.75} />
        <strong className="truncate font-semibold">{data.title}</strong>
        <span className="ml-auto font-mono text-[11px] text-primary-foreground/60">
          {getRegistryTypeLabel(data.type)}
        </span>
      </div>
      <ul className="flex flex-col gap-1 font-mono text-[11.5px]">
        {data.files.map((file) => (
          <li key={file} title={file} className="flex items-center gap-1.5 opacity-90">
            <FileCodeIcon className="size-3 shrink-0" strokeWidth={1.75} />
            <span className="truncate">
              <span className="opacity-50">…/</span>
              {splitFilePath(file).base}
            </span>
          </li>
        ))}
      </ul>
      <Handle type="source" position={Position.Right} style={hiddenHandleStyle} />
    </div>
  );
}

export type FlowChainNodeData = {
  label: string;
  icon: LucideIcon;
  kind: string;
  step?: number;
  lines: readonly string[];
  linesArePaths?: boolean;
  variant: "item" | "root" | "remote" | "sink";
  target?: string;
  apiSummary?: string;
};

export function getApiSummary(api: RegistryFlowApi): string | undefined {
  const parts = api.variants.map((variant) => `${variant.name} ${variant.options.length}`);

  if (api.props.length > 0) {
    parts.push(`${api.props.length} ${api.props.length === 1 ? "prop" : "props"}`);
  }

  return parts.length > 0 ? parts.join(" · ") : undefined;
}

export type FlowChainNode = Node<FlowChainNodeData, "chain">;

export const FLOW_CHAIN_WIDTH = 240;
const CHAIN_TITLE_CENTER = 40;

// Hover state lives outside node data so hovering keeps the nodes array
// stable. New node objects make React Flow re-measure and repaint every node.
export const FlowChainHotContext = React.createContext<string | null>(null);

export function FlowChainNodeView({ id, data }: NodeProps<FlowChainNode>) {
  const Icon = data.icon;
  const isRoot = data.variant === "root";
  const isHot = React.use(FlowChainHotContext) === id;

  return (
    <div
      style={{ width: FLOW_CHAIN_WIDTH }}
      className={cn(
        "rounded-xl border bg-card text-[13px] shadow-xs transition-[box-shadow,border-color] duration-150",
        isRoot && "border-primary bg-primary font-mono text-xs text-primary-foreground",
        data.variant === "remote" && "border-dashed",
        data.variant === "sink" && "bg-muted",
        data.target && "cursor-pointer",
        isHot && "border-foreground ring-3 ring-foreground/10",
      )}
    >
      <Handle type="target" position={Position.Top} style={hiddenHandleStyle} />
      <div
        className={cn(
          "px-3 pt-2 font-mono text-[10.5px] tracking-wider uppercase",
          isRoot ? "text-primary-foreground/55" : "text-muted-foreground",
        )}
      >
        {data.kind}
      </div>
      <div className="flex items-center gap-2 px-3 pt-1 pb-2.5">
        <Icon className="size-3.5 shrink-0" strokeWidth={1.75} />
        <strong className="truncate font-semibold">{data.label}</strong>
        {data.step === undefined ? null : (
          <span
            className={cn(
              "ml-auto font-mono text-[11px]",
              isRoot ? "text-primary-foreground/55" : "text-muted-foreground",
            )}
          >
            #{data.step}
          </span>
        )}
      </div>
      {data.lines.length > 0 ? (
        <ul className="flex flex-col gap-0.5 border-t px-3 pt-2 pb-2.5 font-mono text-[11.5px] text-muted-foreground">
          {data.lines.map((line) => (
            <li key={line} title={line} className="truncate">
              {data.linesArePaths && line.includes("/") ? "…/" : null}
              <span className="font-medium text-foreground">
                {data.linesArePaths ? splitFilePath(line).base : line}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {data.apiSummary ? (
        <div
          title={data.apiSummary}
          className={cn(
            "flex items-center gap-1.5 border-t px-3 py-1.5 font-mono text-[11px]",
            isRoot
              ? "border-primary-foreground/15 text-primary-foreground/70"
              : "text-muted-foreground",
          )}
        >
          <SlidersHorizontalIcon className="size-3 shrink-0" strokeWidth={1.75} />
          <span className="truncate">{data.apiSummary}</span>
        </div>
      ) : null}
      <Handle type="source" position={Position.Bottom} style={hiddenHandleStyle} />
      <Handle
        id="props"
        type="source"
        position={Position.Right}
        style={{ ...hiddenHandleStyle, top: CHAIN_TITLE_CENTER }}
      />
    </div>
  );
}

export function estimateChainNodeHeight(lineCount: number, hasApiSummary = false): number {
  return 62 + (lineCount > 0 ? 18 + lineCount * 18 : 0) + (hasApiSummary ? 27 : 0);
}

export type FlowPropNodeRow = { label: string; detail?: string; isDefault?: boolean };

export type FlowPropNodeData = {
  owner: string;
  label: string;
  rows: readonly FlowPropNodeRow[];
  expanded: boolean;
};

export type FlowPropNode = Node<FlowPropNodeData, "prop">;

export const FLOW_PROP_WIDTH = 184;
const PROP_HEADER_HEIGHT = 34;
const PROP_ROW_HEIGHT = 22;

export function estimatePropNodeHeight(rowCount: number, expanded: boolean): number {
  return PROP_HEADER_HEIGHT + (expanded ? rowCount * PROP_ROW_HEIGHT + 10 : 0);
}

export const FlowPropToggleContext = React.createContext<((id: string) => void) | null>(null);

export function FlowPropNodeView({ id, data }: NodeProps<FlowPropNode>) {
  const isHot = React.use(FlowChainHotContext) === data.owner;
  const onToggle = React.use(FlowPropToggleContext);

  return (
    <div
      style={{ width: FLOW_PROP_WIDTH }}
      className={cn(
        "rounded-lg border bg-card font-mono text-[11.5px] shadow-xs transition-[box-shadow,border-color] duration-150",
        isHot && "border-foreground/40 ring-3 ring-foreground/5",
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ ...hiddenHandleStyle, top: PROP_HEADER_HEIGHT / 2 }}
      />
      <button
        type="button"
        aria-expanded={data.expanded}
        aria-controls={`${id}-options`}
        aria-label={`${data.expanded ? "Collapse" : "Expand"} ${data.label} options`}
        onClick={() => onToggle?.(id)}
        style={{ height: PROP_HEADER_HEIGHT }}
        className="nodrag flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 text-left outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <SlidersHorizontalIcon
          className="size-3 shrink-0 text-muted-foreground"
          strokeWidth={1.75}
        />
        <span className="truncate font-medium">{data.label}</span>
        <span className="ml-auto rounded-full bg-muted px-1.5 text-[10.5px] text-muted-foreground tabular-nums">
          {data.rows.length}
        </span>
        <ChevronRightIcon
          aria-hidden="true"
          className={cn(
            "size-3 shrink-0 text-muted-foreground transition-transform duration-150",
            data.expanded && "rotate-90",
          )}
          strokeWidth={1.75}
        />
      </button>
      {data.expanded ? (
        <ul id={`${id}-options`} className="pb-2">
          {data.rows.map((row, index) => (
            <li
              key={row.label}
              title={row.detail ? `${row.label}: ${row.detail}` : row.label}
              style={{ height: PROP_ROW_HEIGHT }}
              className={cn(
                "relative flex items-center gap-1.5 pr-2.5 pl-8 text-muted-foreground",
                row.isDefault && "text-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-4 h-1/2 w-2.5 rounded-bl-md border-b border-l border-muted-foreground/35"
              />
              {index < data.rows.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 bottom-0 left-4 border-l border-muted-foreground/35"
                />
              ) : null}
              <span
                className={cn(
                  "shrink-0",
                  row.isDefault &&
                    "-ml-1.5 rounded-sm bg-foreground px-1.5 font-medium text-background",
                )}
              >
                {row.label}
              </span>
              {row.detail ? <span className="truncate opacity-70">{row.detail}</span> : null}
              {row.isDefault ? (
                <span className="ml-auto shrink-0 text-[10px] tracking-wide text-muted-foreground">
                  default
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
