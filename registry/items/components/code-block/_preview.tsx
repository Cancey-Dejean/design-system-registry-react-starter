"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "./code-block";

const output = `$ bun install
$ bun run build`;

export function Preview() {
  return (
    <CodeBlock className="max-w-xl">
      <CodeBlockHeader>
        <CodeBlockTitle>Terminal</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={output} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{output}</CodeBlockContent>
    </CodeBlock>
  );
}
