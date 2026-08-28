import { visit } from "unist-util-visit";
import type { Root, List, ListItem, Paragraph } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";

function firstParagraph(item: ListItem): Paragraph | null {
  const first = item.children[0];
  return first?.type === "paragraph" ? first : null;
}

/**
 * Renders a `:::argument` directive as a formal argument.
 *
 * No label -> plain numbered premises (1, 2, 3...), conclusion marked "C.":
 * :::argument
 * - All men are mortal.
 * - Socrates is a man.
 * - Socrates is mortal.
 * :::
 *
 * With a label -> the whole sequence (including the conclusion) shares that
 * letter, e.g. `:::argument{label="C"}` gives C1, C2, C3 — the conclusion is
 * just the last item in the same sequence, not a separately-prefixed "C.",
 * since that would collide with the sequence's own letter.
 */
export function remarkArgument() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node) => {
      const directive = node as ContainerDirective;
      if (directive.name !== "argument") return;

      const list = directive.children.find(
        (child): child is List => child.type === "list",
      );
      if (!list) return;

      const label = directive.attributes?.label?.trim();
      const count = list.children.length;

      list.children.forEach((item, index) => {
        const isConclusion = index === count - 1;
        const n = index + 1;
        const prefix = label
          ? `${label}${n}. `
          : isConclusion
            ? "C. "
            : `${n}. `;

        const paragraph = firstParagraph(item);
        if (paragraph) {
          paragraph.children.unshift({ type: "text", value: prefix });
        }
        item.data = {
          ...item.data,
          hProperties: {
            className: [
              isConclusion ? "argument-conclusion" : "argument-premise",
            ],
          },
        };
      });

      list.data = {
        ...list.data,
        hProperties: { className: ["argument-list"] },
      };

      directive.data = {
        ...directive.data,
        hName: "div",
        hProperties: { className: ["argument-block"] },
      };
    });
  };
}
