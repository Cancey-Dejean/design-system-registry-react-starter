---
name: writing-story-files
description: Use when adding, updating, or scaffolding Storybook stories for registry items (`*.stories.tsx`, `stories/`, CSF, StoryWrapper, demo-*.tsx), when asked how to write a story file, or when a new component, block, hook, or lib needs a Storybook story.
---

# Writing Story Files

Stories are authoring-only. The starter pattern is `registry/items/components/container/stories/`, not Button, Badge, Alert, or Heading.

## When to Use

- New registry item needs a story
- User asks to write or update a `*.stories.tsx` file
- Choosing which existing story to copy

Copy Container. Add extra stories only when Default plus controls cannot show the API.

## File layout

```
registry/items/<kind>/<name>/stories/
  <name>.stories.tsx      # required
  demo-<name>.tsx         # when the canvas needs placeholder content or visual chrome
```

Do not colocate `*.stories.tsx` beside the component file. Do not list `stories/` in `_registry.mdx` `files`. Storybook loads `registry/items/**/*.stories.*`; doctor warnings about unpublished stories are expected.

| Item folder | `title` |
|-------------|---------|
| `components/` | `Components/<PascalName>` |
| `blocks/` | `Blocks/<PascalName>` |
| `hooks/` | `Hooks/<exportName>` |
| `lib/` | `Lib/<Title Case>` |
| other | `Utilities/<PascalName>` |

## Story file

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";

import StoryWrapper from "@registry/lib/story-wrapper";

import { Container } from "../container";
import { CONTAINER_SIZES } from "../container.variants";
import { DemoContainer } from "./demo-container";

const meta: Meta = {
  title: "Components/Container",
  component: Container,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    size: "base",
  },
  argTypes: {
    size: {
      control: "select",
      options: CONTAINER_SIZES,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DemoContainer {...args} />,
};
```

Required:

- Types from `@storybook/react-vite`, not `@storybook/react`
- `StoryWrapper` decorator with no extra chrome unless the canvas is unusable
- CVA axes use exported key arrays (`CONTAINER_SIZES`), never hardcoded `options`
- Default `args` match `defaultVariants`
- One `Default` story that spreads `args` into the demo (or the component when no demo is needed)
- `export default meta` then `type Story = StoryObj<typeof meta>`

Skip unless the canvas is unusable: `tags: ["autodocs"]`, `parameters.layout`, `parameters.docs`, extra decorator `className`, inner max-width wrappers, gallery stories (`Sizes`, `Tones`, `All variants`).

## Demo file

Extract `demo-<name>.tsx` when the component is a layout or chrome wrapper (empty box, size, padding) so controls are visible. Keep placeholder children in the demo, not inlined in the stories file.

```tsx
import { cn } from "cn";

import { Container } from "../container";

export function DemoContainer({
  className,
  ...props
}: React.ComponentProps<typeof Container>) {
  return (
    <Container
      className={cn(
        "border-foreground-muted bg-background text-foreground flex items-center justify-center rounded-2xl border border-dashed p-4 dark:bg-transparent dark:text-white",
        className,
      )}
      {...props}
    >
      Content goes here...
    </Container>
  );
}
```

Skip the demo file when `args.children` already makes the component visible (text, button label). Then Default needs no `render` — meta or story `args` are enough.

## Common Mistakes

| Excuse | Reality |
|--------|---------|
| "Alert/Badge/Button is a fuller example" | Fuller ≠ starter. Container is the pattern. |
| "`autodocs` and `layout: fullscreen` are standard" | Container omits both. |
| "Need a Tones/Sizes gallery" | Controls already cover CVA axes. |
| "List stories in `_registry.mdx`" | Stories are not installable. |
| "Hardcode `options: ['sm', 'md']`" | Import the variant key array. |
| "Put `Component.stories.tsx` beside the source" | Always `stories/<name>.stories.tsx`. |
