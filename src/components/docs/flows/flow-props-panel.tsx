import { ChevronRightIcon, SearchIcon, TableIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RegistryFlowItem, RegistryFlowVariant } from "@/lib/registry/flow-data";
import { cn } from "@/lib/utils";

import { flowSidebarScrollClassName } from "./flow-canvas";

const MAX_VISIBLE_OPTIONS = 8;

type FlowPropsPanelProps = {
  item: RegistryFlowItem;
  previewing: boolean;
};

export function FlowPropsPanel({ item, previewing }: FlowPropsPanelProps) {
  const { component, variants, props } = item.api;
  const isEmpty = variants.length === 0 && props.length === 0;

  const heading = (
    <>
      <h3 className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
        Props
      </h3>
      {component ? (
        <code className="truncate font-mono text-[11px] text-foreground">{`<${component}>`}</code>
      ) : null}
    </>
  );

  if (isEmpty) {
    return (
      <section className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">{heading}</div>
        <p className="rounded-lg border border-dashed px-3 py-2.5 text-xs text-muted-foreground">
          No variants or own props found for {item.title}.
        </p>
      </section>
    );
  }

  return (
    <Collapsible defaultOpen render={<section />} className="flex flex-col">
      <CollapsibleTrigger className="group/props -mx-2 flex items-center gap-2 rounded-md px-2 py-1 text-left outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50">
        <ChevronRightIcon
          aria-hidden="true"
          className="size-3 shrink-0 text-muted-foreground transition-transform duration-150 group-data-panel-open/props:rotate-90"
          strokeWidth={1.75}
        />
        {heading}
        <span className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">
          {previewing ? `previewing ${item.title}` : getCountLabel(variants.length, props.length)}
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-2">
        <div className="flex flex-col divide-y overflow-hidden rounded-lg border bg-card">
          {variants.map((variant) => (
            <VariantRow key={variant.name} variant={variant} />
          ))}
          {props.length > 0 ? (
            <div className="flex flex-col gap-1.5 px-3 py-2.5">
              <span className="font-mono text-[11.5px] font-medium">props</span>
              <ul className="flex flex-wrap gap-1" aria-label="Own props">
                {props.map((prop) => (
                  <li
                    key={prop.name}
                    className="rounded-md border px-1.5 py-0.5 font-mono text-[11px] text-foreground"
                  >
                    {prop.name}
                    {prop.optional ? <span className="text-muted-foreground">?</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <FlowPropsDialog item={item} />
      </CollapsibleContent>
    </Collapsible>
  );
}

function FlowPropsDialog({ item }: { item: RegistryFlowItem }) {
  const { component, variants, props } = item.api;
  const rows = [
    ...variants.map((variant) => ({
      name: variant.name,
      optional: true,
      type: variant.options.map((option) => `"${option}"`).join(" | "),
      defaultValue: variant.defaultValue === undefined ? undefined : `"${variant.defaultValue}"`,
    })),
    ...props,
  ];
  const [query, setQuery] = React.useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleRows = normalizedQuery
    ? rows.filter((row) => row.name.toLowerCase().includes(normalizedQuery))
    : rows;

  return (
    <Dialog onOpenChange={(open) => !open && setQuery("")}>
      <DialogTrigger render={<Button size="xs" className="mt-2 self-start" />}>
        <TableIcon data-icon="inline-start" />
        Detailed list
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono">{`<${component ?? item.title}>`} props</DialogTitle>
          <DialogDescription>
            Every variant and prop {item.title} declares, with its type and default value.
          </DialogDescription>
        </DialogHeader>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search props…"
            aria-label="Search props by name"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText aria-live="polite" className="font-mono text-xs tabular-nums">
              {visibleRows.length}/{rows.length}
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <div className="overflow-hidden rounded-lg border">
          <Table className="table-fixed font-mono text-xs">
            <PropsTableColumns />
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className={cn("max-h-[50svh] overflow-y-auto", flowSidebarScrollClassName)}>
            <Table className="table-fixed font-mono text-xs">
              <PropsTableColumns />
              <TableBody>
                {visibleRows.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={3}
                      className="py-6 text-center font-sans text-muted-foreground"
                    >
                      No props match “{query.trim()}”.
                    </TableCell>
                  </TableRow>
                ) : null}
                {visibleRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="align-top font-medium">
                      {row.name}
                      {row.optional ? (
                        <span className="text-muted-foreground">?</span>
                      ) : (
                        <span className="ml-1.5 font-sans text-[10px] text-muted-foreground uppercase">
                          required
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="align-top break-words whitespace-normal text-muted-foreground">
                      {row.type}
                    </TableCell>
                    <TableCell className="align-top break-words whitespace-normal">
                      {row.defaultValue ?? <span className="text-muted-foreground">—</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PropsTableColumns() {
  return (
    <colgroup>
      <col className="w-48" />
      <col />
      <col className="w-36" />
    </colgroup>
  );
}

function getCountLabel(variantCount: number, propCount: number): string {
  return [
    variantCount > 0 ? `${variantCount} ${variantCount === 1 ? "variant" : "variants"}` : "",
    propCount > 0 ? `${propCount} ${propCount === 1 ? "prop" : "props"}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

function VariantRow({ variant }: { variant: RegistryFlowVariant }) {
  const visible = variant.options.slice(0, MAX_VISIBLE_OPTIONS);
  const hidden = variant.options.length - visible.length;

  return (
    <div className="flex flex-col gap-1.5 px-3 py-2.5">
      <div className="flex items-baseline justify-between gap-2 font-mono text-[11.5px]">
        <span className="font-medium">{variant.name}</span>
        {variant.defaultValue === undefined ? null : (
          <span className="text-muted-foreground">default: {variant.defaultValue}</span>
        )}
      </div>
      <ul className="flex flex-wrap gap-1" aria-label={`${variant.name} options`}>
        {visible.map((option) => (
          <li
            key={option}
            className={cn(
              "rounded-md border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground",
              option === variant.defaultValue && "border-foreground/40 bg-muted text-foreground",
            )}
          >
            {option}
          </li>
        ))}
        {hidden > 0 ? (
          <li className="px-1 py-0.5 font-mono text-[11px] text-muted-foreground">
            +{hidden} more
          </li>
        ) : null}
      </ul>
    </div>
  );
}
