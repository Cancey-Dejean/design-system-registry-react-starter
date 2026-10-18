import StoryWrapper from "@registry/lib/story-wrapper";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../code-block";
import { CODE_BLOCK_SIZES, CODE_BLOCK_VARIANTS } from "../code-block.variants";

const output = `$ bun install
$ bun run build
✓ Built in 1.2s`;

const meta: Meta = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  args: {
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: CODE_BLOCK_VARIANTS,
    },
    size: {
      control: "select",
      options: [...CODE_BLOCK_SIZES],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockHeader>
        <CodeBlockTitle>Terminal</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={output} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{output}</CodeBlockContent>
    </CodeBlock>
  ),
};
