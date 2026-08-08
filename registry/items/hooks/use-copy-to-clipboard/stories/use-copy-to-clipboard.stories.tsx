import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import StoryWrapper from "@/components/ui/story-wrapper";

import { useCopyToClipboard } from "../use-copy-to-clipboard";

const exampleCommand = "npx shadcn@latest add https://example.com/r/example-card.json";

function DefaultDemo() {
  const copyState = useCopyToClipboard();

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Button onClick={() => void copyState.copy(exampleCommand)}>
        {copyState.status === "copied" ? "Copied" : "Copy example command"}
      </Button>
      <p className="max-w-sm font-mono text-xs break-all text-muted-foreground">{exampleCommand}</p>
      <p className="text-sm text-muted-foreground">
        {copyState.status === "copied"
          ? "Copied to clipboard."
          : copyState.status === "error"
            ? `Error: ${copyState.error.message}`
            : "Ready to copy."}
      </p>
    </div>
  );
}

function StatusPanelDemo() {
  const copyState = useCopyToClipboard();
  const samples = [
    { label: "email", value: "hello@example.com" },
    { label: "token", value: "sk_live_example_token_123" },
    { label: "url", value: "https://ui.shadcn.com/docs" },
  ];

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {samples.map((sample) => (
          <Button
            key={sample.label}
            variant="outline"
            size="sm"
            onClick={() => void copyState.copy(sample.value)}
          >
            Copy {sample.label}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={copyState.reset}>
          Reset
        </Button>
      </div>
      <dl className="grid gap-2 rounded-lg border p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">status</dt>
          <dd className="font-mono">{copyState.status}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">value</dt>
          <dd className="truncate font-mono">{copyState.value ?? "null"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">error</dt>
          <dd className="truncate font-mono">{copyState.error?.message ?? "null"}</dd>
        </div>
      </dl>
    </div>
  );
}

function InputWithCopyDemo() {
  const copyState = useCopyToClipboard();
  const value = "design-system-registry-react-starter";

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
        <code className="flex-1 truncate text-sm">{value}</code>
        <Button size="sm" variant="outline" onClick={() => void copyState.copy(value)}>
          {copyState.status === "copied" && copyState.value === value ? "Copied" : "Copy"}
        </Button>
      </div>
      {copyState.status === "error" ? (
        <p className="text-sm text-destructive">{copyState.error.message}</p>
      ) : null}
    </div>
  );
}

const meta = {
  title: "Hooks/useCopyToClipboard",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A small hook that copies text and tracks the latest copy result (`idle` | `copied` | `error`).",
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper className="max-w-full p-6">
        <div className="flex w-full justify-center">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DefaultDemo />,
};

export const StatusPanel: Story = {
  name: "Status panel",
  render: () => <StatusPanelDemo />,
};

export const InputWithCopy: Story = {
  name: "Input with copy",
  render: () => <InputWithCopyDemo />,
};
