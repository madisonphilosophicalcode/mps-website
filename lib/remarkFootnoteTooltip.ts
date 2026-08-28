import { visit } from "unist-util-visit";
import type { Root, FootnoteDefinition, FootnoteReference, Nodes } from "mdast";

function extractText(node: Nodes): string {
  if (node.type === "text") return node.value;
  if ("children" in node) {
    return node.children.map(extractText).join("");
  }
  return "";
}

/**
 * Attaches each footnote's plain-text content to its reference as a
 * data-tooltip attribute, so the reference can show a hover preview without
 * needing to look up the definition elsewhere in the rendered page.
 */
export function remarkFootnoteTooltip() {
  return (tree: Root) => {
    const definitions = new Map<string, FootnoteDefinition>();
    visit(tree, "footnoteDefinition", (node) => {
      definitions.set(node.identifier, node);
    });

    visit(tree, "footnoteReference", (node: FootnoteReference) => {
      const definition = definitions.get(node.identifier);
      if (!definition) return;
      const text = extractText(definition).trim();
      node.data = {
        ...node.data,
        hProperties: { "data-tooltip": text },
      };
    });
  };
}
