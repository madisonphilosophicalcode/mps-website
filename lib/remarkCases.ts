import { visit } from "unist-util-visit";
import type { Root, List, ListItem, Paragraph } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";

function firstParagraph(item: ListItem): Paragraph | null {
  const first = item.children[0];
  return first?.type === "paragraph" ? first : null;
}

/**
 * Renders a `:::cases{label="B"}` directive as a plain lettered enumeration
 * — no conclusion, just a labeled list of examples:
 *
 * :::cases{label="B"}
 * - Paying a person to put a hit on another's kneecaps.
 * - Paying a cop to let you out of a speeding ticket.
 * - Paying a voter to vote for your candidate.
 * :::
 *
 * renders as B1, B2, B3.
 */
export function remarkCases() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node) => {
      const directive = node as ContainerDirective;
      if (directive.name !== "cases") return;

      const list = directive.children.find(
        (child): child is List => child.type === "list",
      );
      if (!list) return;

      const label = directive.attributes?.label?.trim() || "A";

      list.children.forEach((item, index) => {
        const n = index + 1;
        const paragraph = firstParagraph(item);
        if (paragraph) {
          paragraph.children.unshift({
            type: "text",
            value: `${label}${n}. `,
          });
        }
        item.data = {
          ...item.data,
          hProperties: { className: ["cases-item"] },
        };
      });

      list.data = {
        ...list.data,
        hProperties: { className: ["cases-list"] },
      };

      directive.data = {
        ...directive.data,
        hName: "div",
        hProperties: { className: ["cases-block"] },
      };
    });
  };
}
