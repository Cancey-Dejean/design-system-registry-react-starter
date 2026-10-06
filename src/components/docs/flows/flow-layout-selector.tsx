import { Columns3Icon, CrosshairIcon, WorkflowIcon, type LucideIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { FlowLayout } from "./use-flow-layout";

export const flowLayoutOptions = [
  { id: "map", label: "Registry map", icon: WorkflowIcon },
  { id: "lanes", label: "Lineage lanes", icon: Columns3Icon },
  { id: "chain", label: "Install chain", icon: CrosshairIcon },
] as const satisfies readonly { id: FlowLayout; label: string; icon: LucideIcon }[];

type FlowLayoutSelectorProps = {
  value: FlowLayout;
  onValueChange: (layout: FlowLayout) => void;
  className?: string;
};

export function FlowLayoutSelector({ value, onValueChange, className }: FlowLayoutSelectorProps) {
  return (
    <fieldset
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border bg-card p-0.5 shadow-xs",
        className,
      )}
    >
      <legend className="sr-only">Layout</legend>
      <span
        aria-hidden="true"
        className="px-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase"
      >
        Layout
      </span>
      <span aria-hidden="true" className="mr-0.5 h-4 w-px bg-border" />
      {flowLayoutOptions.map((option) => {
        const Icon = option.icon;

        return (
          <Tooltip key={option.id}>
            <TooltipTrigger
              render={
                <label className="grid size-7 cursor-pointer place-items-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-muted hover:text-foreground has-checked:border-violet-500/50 has-checked:bg-violet-500/10 has-checked:text-violet-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-violet-500 dark:has-checked:text-violet-400">
                  <input
                    type="radio"
                    name="flow-layout"
                    value={option.id}
                    checked={option.id === value}
                    onChange={() => onValueChange(option.id)}
                    className="sr-only"
                  />
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                  <span className="sr-only">{option.label}</span>
                </label>
              }
            />
            <TooltipContent side="bottom">{option.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </fieldset>
  );
}
