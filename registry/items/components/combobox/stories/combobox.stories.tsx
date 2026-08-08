import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import StoryWrapper from "@/components/ui/story-wrapper";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
} from "../combobox";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

type Framework = {
  label: string;
  value: string;
};

const frameworkObjects: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
];

const timezoneGroups = [
  {
    region: "Americas",
    zones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles"],
  },
  {
    region: "Europe",
    zones: ["Europe/London", "Europe/Paris", "Europe/Berlin"],
  },
  {
    region: "Asia",
    zones: ["Asia/Tokyo", "Asia/Shanghai", "Asia/Singapore"],
  },
] as const;

const allTimezones = timezoneGroups.flatMap((group) => [...group.zones]);

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Autocomplete input with a list of suggestions. Built on Base UI Combobox. See https://ui.shadcn.com/docs/components/base/combobox",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="w-full max-w-xs">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" className="w-full" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const WithClear: Story = {
  name: "With clear",
  render: () => (
    <Combobox items={frameworks} defaultValue="Next.js">
      <ComboboxInput placeholder="Select a framework" showClear className="w-full" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

function MultipleDemo() {
  const [value, setValue] = useState<string[]>(["Next.js"]);

  return (
    <Combobox
      items={frameworks}
      multiple
      value={value}
      onValueChange={(next) => {
        setValue(Array.isArray(next) ? next : []);
      }}
    >
      <ComboboxChips className="w-full">
        <ComboboxValue>
          {(selected) =>
            (Array.isArray(selected) ? selected : []).map((item) => (
              <ComboboxChip key={String(item)}>{String(item)}</ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const Multiple: Story = {
  render: () => <MultipleDemo />,
};

export const Groups: Story = {
  render: () => (
    <Combobox items={allTimezones}>
      <ComboboxInput placeholder="Select a timezone" className="w-full" />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {timezoneGroups.map((group, index) => (
            <div key={group.region}>
              {index > 0 ? <ComboboxSeparator /> : null}
              <ComboboxGroup items={[...group.zones]}>
                <ComboboxLabel>{group.region}</ComboboxLabel>
                <ComboboxCollection>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            </div>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const CustomItems: Story = {
  name: "Custom items",
  render: () => (
    <Combobox
      items={frameworkObjects}
      itemToStringValue={(framework: Framework) => framework.label}
    >
      <ComboboxInput placeholder="Select a framework" className="w-full" />
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(framework: Framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{framework.label}</span>
                <span className="text-xs text-muted-foreground">{framework.value}</span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Combobox items={frameworks} disabled>
      <ComboboxInput placeholder="Select a framework" className="w-full" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Select a framework" className="w-full" aria-invalid />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <p className="text-sm text-destructive">Please select a valid framework.</p>
    </div>
  ),
};

export const AutoHighlight: Story = {
  name: "Auto highlight",
  render: () => (
    <Combobox items={frameworks} autoHighlight>
      <ComboboxInput placeholder="Type to filter…" className="w-full" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};
