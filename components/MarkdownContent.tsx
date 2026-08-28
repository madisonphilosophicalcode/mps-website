import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import type { Components } from "react-markdown";
import { remarkBibliography } from "@/lib/remarkBibliography";
import { remarkArgument } from "@/lib/remarkArgument";
import { remarkCases } from "@/lib/remarkCases";
import { remarkFootnoteTooltip } from "@/lib/remarkFootnoteTooltip";
import FootnoteTooltip from "@/components/FootnoteTooltip";

const components: Components = {
  h1: ({ node, className, ...props }) => (
    <h2
      className="mt-8 mb-3 font-serif text-22 text-ink italic sm:text-28"
      {...props}
    />
  ),
  h2: ({ node, id, className, ...props }) => {
    if (id === "footnote-label") {
      return (
        <h2
          id={id}
          className="mt-10 mb-3 font-mono text-xs tracking-wide text-gold uppercase not-italic"
          {...props}
        />
      );
    }
    return (
      <h3
        id={id}
        className="mt-6 mb-2 font-serif text-lg text-ink italic sm:text-22"
        {...props}
      />
    );
  },
  h3: ({ node, className, ...props }) => (
    <h4
      className="mt-5 mb-2 font-serif text-base text-ink italic sm:text-lg"
      {...props}
    />
  ),
  p: ({ node, className, ...props }) => (
    <p
      className="mb-4 font-mono text-13 leading-relaxed text-ink sm:text-15"
      {...props}
    />
  ),
  a: ({ node, href, className, ...rest }) => {
    const isFootnoteRef = "data-footnote-ref" in rest;
    const isBackref = "data-footnote-backref" in rest;
    const isCitationRef = className === "citation-ref";
    const isInternalAnchor = href?.startsWith("#");

    if (isFootnoteRef || isCitationRef) {
      return (
        <a
          href={href}
          className="text-maroon no-underline transition-colors duration-300 hover:text-gold"
          {...rest}
        />
      );
    }
    if (isBackref) {
      return (
        <a
          href={href}
          className="text-ink/40 no-underline transition-colors duration-300 hover:text-maroon"
          {...rest}
        />
      );
    }
    return (
      <a
        href={href}
        className="text-maroon underline transition-colors duration-300 hover:text-gold"
        target={isInternalAnchor ? undefined : "_blank"}
        rel={isInternalAnchor ? undefined : "noopener noreferrer"}
        {...rest}
      />
    );
  },
  ul: ({ node, className, ...props }) =>
    className === "argument-list" || className === "cases-list" ? (
      <ul
        className="list-none pl-0 font-mono text-13 text-ink sm:text-15"
        {...props}
      />
    ) : (
      <ul
        className="mb-4 list-disc space-y-1 pl-5 font-mono text-13 text-ink sm:text-15"
        {...props}
      />
    ),
  ol: ({ node, className, ...props }) =>
    className === "argument-list" || className === "cases-list" ? (
      <ol
        className="list-none pl-0 font-mono text-13 text-ink sm:text-15"
        {...props}
      />
    ) : (
      <ol
        className="mb-4 list-decimal space-y-1 pl-5 font-mono text-13 text-ink sm:text-15"
        {...props}
      />
    ),
  li: ({ node, className, ...props }) => {
    if (className === "argument-premise" || className === "cases-item") {
      return <li className="py-0.5" {...props} />;
    }
    if (className === "argument-conclusion") {
      return (
        <li
          className="mt-1 border-t border-ink/30 pt-1.5 font-bold"
          {...props}
        />
      );
    }
    return <li {...props} />;
  },
  div: ({ node, className, ...props }) =>
    className === "argument-block" || className === "cases-block" ? (
      <div
        className="mb-4 rounded-[6px] border border-ink/15 px-5 py-4"
        {...props}
      />
    ) : (
      <div {...props} />
    ),
  blockquote: ({ node, className, ...props }) => (
    <blockquote
      className="mb-4 border-l-2 border-gold pl-4 font-mono text-13 text-ink/80 italic sm:text-15"
      {...props}
    />
  ),
  code: ({ node, className, ...props }) => (
    <code
      className="rounded bg-ink/10 px-1 py-0.5 font-mono text-[0.9em] text-ink"
      {...props}
    />
  ),
  pre: ({ node, className, ...props }) => (
    <pre
      className="mb-4 overflow-x-auto rounded-[6px] bg-panel p-4 font-mono text-13 text-cream"
      {...props}
    />
  ),
  hr: ({ node, className, ...props }) => (
    <hr className="my-6 border-ink/20" {...props} />
  ),
  section: ({ node, className, ...props }) => (
    <section className="mt-8 border-t border-ink/10 pt-2" {...props} />
  ),
  sup: ({ node, className, children, ...rest }) => {
    const { "data-tooltip": tooltip, ...props } = rest as Record<
      string,
      unknown
    >;
    return (
      <sup className="text-[0.75em]" {...props}>
        <FootnoteTooltip tooltip={tooltip as string | undefined}>
          {children}
        </FootnoteTooltip>
      </sup>
    );
  },
};

export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        remarkDirective,
        remarkArgument,
        remarkCases,
        remarkFootnoteTooltip,
        remarkBibliography,
      ]}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  );
}
