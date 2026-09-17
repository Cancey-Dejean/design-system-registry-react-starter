import { getNodeText, type MdxAstNode } from "../content/mdx.ts";

export type DocsTocLink = {
  id: string;
  text: string;
  depth: 2 | 3;
  children?: DocsTocLink[];
};

export function getDocsToc(root: MdxAstNode): DocsTocLink[] {
  const headings: { depth: 2 | 3; text: string }[] = [];
  collectHeadings(root, headings);

  return nestHeadingLinks(headings);
}

export function slugifyHeading(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .trim()
    .replace(/['’]/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

export function getUniqueHeadingId(text: string, usedIds: Map<string, number>): string {
  const base = slugifyHeading(text) || "heading";
  const count = usedIds.get(base) ?? 0;
  usedIds.set(base, count + 1);

  return count === 0 ? base : `${base}-${count}`;
}

function collectHeadings(node: MdxAstNode, headings: { depth: 2 | 3; text: string }[]) {
  if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
    const text = getNodeText(node).trim();

    if (text) {
      headings.push({ depth: node.depth, text });
    }

    return;
  }

  for (const child of node.children ?? []) {
    collectHeadings(child, headings);
  }
}

function nestHeadingLinks(headings: readonly { depth: 2 | 3; text: string }[]): DocsTocLink[] {
  const usedIds = new Map<string, number>();
  const links: DocsTocLink[] = [];
  let currentH2: DocsTocLink | undefined;

  for (const heading of headings) {
    const link: DocsTocLink = {
      id: getUniqueHeadingId(heading.text, usedIds),
      text: heading.text,
      depth: heading.depth,
    };

    if (heading.depth === 2) {
      currentH2 = link;
      links.push(link);
      continue;
    }

    if (currentH2) {
      currentH2.children = [...(currentH2.children ?? []), link];
      continue;
    }

    links.push(link);
  }

  return links;
}
