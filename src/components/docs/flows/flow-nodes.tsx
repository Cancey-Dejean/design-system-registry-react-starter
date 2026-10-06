import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import {
  BoxIcon,
  BracesIcon,
  ComponentIcon,
  FileCodeIcon,
  LayersIcon,
  PaletteIcon,
  ZapIcon,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type * as React from "react";

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
  hot: boolean;
  target?: string;
};

export type FlowChainNode = Node<FlowChainNodeData, "chain">;

export const FLOW_CHAIN_WIDTH = 240;

export function FlowChainNodeView({ data }: NodeProps<FlowChainNode>) {
  const Icon = data.icon;
  const isRoot = data.variant === "root";

  return (
    <div
      style={{ width: FLOW_CHAIN_WIDTH }}
      className={cn(
        "rounded-xl border bg-card text-[13px] shadow-xs transition-[box-shadow,border-color,scale] duration-150",
        isRoot && "border-primary bg-primary font-mono text-xs text-primary-foreground",
        data.variant === "remote" && "border-dashed",
        data.variant === "sink" && "bg-muted",
        data.target && "cursor-pointer",
        data.hot && "scale-[1.02] border-foreground ring-3 ring-foreground/10",
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
      <Handle type="source" position={Position.Bottom} style={hiddenHandleStyle} />
    </div>
  );
}

export function estimateChainNodeHeight(lineCount: number): number {
  return 62 + (lineCount > 0 ? 18 + lineCount * 18 : 0);
}
