"use client";

import { CodeBlock, CodeBlockContent, CodeBlockLine } from "../../components/code-block/code-block";
import { useHighlightedCode } from "./use-highlighted-code";

const source = `const greeting = "hello";
console.log(greeting);`;

export function Preview() {
  const lines = useHighlightedCode(source, "typescript");

  return (
    <CodeBlock className="max-w-xl">
      <CodeBlockContent>
        {lines.map((line, index) => (
          // oxlint-disable-next-line react/no-array-index-key -- line order is the identity
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  );
}
