import { visit } from "unist-util-visit";
import type { Root, Heading, Text, PhrasingContent } from "mdast";

function headingText(node: Heading): string {
  return node.children
    .filter((c): c is Text => c.type === "text")
    .map((c) => c.value)
    .join("");
}

const CITATION_RE = /\[(\d+(?:,\s*\d+)*)\]/g;

function linkifyTextNode(node: Text): PhrasingContent[] | null {
  CITATION_RE.lastIndex = 0;
  if (!CITATION_RE.test(node.value)) return null;
  CITATION_RE.lastIndex = 0;

  const result: PhrasingContent[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = CITATION_RE.exec(node.value))) {
    if (match.index > lastIndex) {
      result.push({
        type: "text",
        value: node.value.slice(lastIndex, match.index),
      });
    }
    const numbers = match[1].split(",").map((s) => s.trim());
    result.push({ type: "text", value: "[" });
    numbers.forEach((n, i) => {
      if (i > 0) result.push({ type: "text", value: ", " });
      result.push({
        type: "link",
        url: `#bib-${n}`,
        children: [{ type: "text", value: n }],
        data: { hProperties: { className: ["citation-ref"] } },
      });
    });
    result.push({ type: "text", value: "]" });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < node.value.length) {
    result.push({ type: "text", value: node.value.slice(lastIndex) });
  }
  return result;
}

/**
 * Finds a "Bibliography"/"References" heading followed by an ordered list,
 * tags each list item with an id (bib-1, bib-2, ...), then rewrites bracket
 * citations like "[3, 6]" earlier in the document into links pointing at
 * those ids. Mirrors how remark-gfm implements footnotes, but for numeric
 * bibliography-style citations, which aren't a native Markdown feature.
 */
export function remarkBibliography() {
  return (tree: Root) => {
    let bibHeadingIndex = -1;

    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (
        node.type === "heading" &&
        /^(bibliography|references)$/i.test(headingText(node).trim())
      ) {
        bibHeadingIndex = i;
        const next = tree.children[i + 1];
        if (next && next.type === "list" && next.ordered) {
          const start = next.start ?? 1;
          next.children.forEach((item, idx) => {
            const n = start + idx;
            item.data = {
              ...item.data,
              hProperties: {
                id: `bib-${n}`,
                ...(item.data?.hProperties as object | undefined),
              },
            };
          });
        }
        break;
      }
    }

    const scope =
      bibHeadingIndex === -1
        ? tree.children
        : tree.children.slice(0, bibHeadingIndex);

    for (const node of scope) {
      visit(node, "text", (textNode, index, parent) => {
        if (!parent || index === undefined) return;
        const replacement = linkifyTextNode(textNode);
        if (replacement) {
          parent.children.splice(index, 1, ...replacement);
          return index + replacement.length;
        }
      });
    }
  };
}
