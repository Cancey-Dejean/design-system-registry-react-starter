import { IconSearch } from "@tabler/icons-react";
import * as React from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";
import type { RegistryFlowGraph } from "@/lib/registry/flow-graph";
import { cn } from "@/lib/utils";

import { RegistryTypeIcon } from "./flow-nodes";

type FlowItemPickerProps = {
  graph: RegistryFlowGraph;
  value: string;
  onValueChange: (name: string) => void;
  className?: string;
};

export function FlowItemPicker({ graph, value, onValueChange, className }: FlowItemPickerProps) {
  const [query, setQuery] = React.useState("");
  const getTitle = (name: string) => graph.items.get(name)?.title ?? name;
  const selectedItem = graph.items.get(value);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredNames = normalizedQuery
    ? graph.names.filter(
        (name) =>
          name.includes(normalizedQuery) || getTitle(name).toLowerCase().includes(normalizedQuery),
      )
    : graph.names;

  return (
    <Combobox
      items={graph.names}
      filteredItems={filteredNames}
      value={value}
      onValueChange={(name) => {
        if (name) {
          onValueChange(name);
        }
      }}
      inputValue={query}
      onInputValueChange={setQuery}
      onOpenChange={(open) => {
        if (!open) {
          setQuery("");
        }
      }}
      itemToStringLabel={getTitle}
    >
      <ComboboxTrigger
        aria-label="Registry item"
        className={cn(
          "flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 text-left text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:border-ring dark:bg-input/30",
          className,
        )}
      >
        {selectedItem ? (
          <RegistryTypeIcon
            type={selectedItem.type}
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.75}
          />
        ) : null}
        <span className="min-w-0 flex-1 truncate">{getTitle(value)}</span>
      </ComboboxTrigger>
      <ComboboxContent className="min-w-(--anchor-width)">
        <ComboboxInput
          aria-label="Search registry items"
          placeholder="Search items…"
          showTrigger={false}
        >
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
        </ComboboxInput>
        <p
          aria-live="polite"
          className="px-3 pt-2 pb-1 font-mono text-[11px] text-muted-foreground"
        >
          {filteredNames.length} {filteredNames.length === 1 ? "item" : "items"}
        </p>
        <ComboboxEmpty>No matching items</ComboboxEmpty>
        <ComboboxList>
          {(name: string) => {
            const item = graph.items.get(name);

            return (
              <ComboboxItem key={name} value={name}>
                {item ? (
                  <RegistryTypeIcon
                    type={item.type}
                    className="size-4 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                ) : null}
                <span className="truncate">{getTitle(name)}</span>
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
