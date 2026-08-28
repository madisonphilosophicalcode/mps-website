import MarkdownContent from "@/components/MarkdownContent";
import type { SanityAgoraArticle } from "@/lib/sanity/queries";

export default function AgoraArticleSection({
  article,
  id,
}: {
  article: SanityAgoraArticle;
  id?: string;
}) {
  return (
    <div className="w-full scroll-mt-24 border-t border-ink/10 py-10 first:border-t-0 first:pt-0">
      <h2
        id={id}
        className="scroll-mt-24 font-serif text-2xl text-ink italic sm:text-32"
      >
        {article.title}
      </h2>
      <p className="mt-1 font-mono text-xs text-ink/60 italic sm:text-sm">
        {article.author}
      </p>
      {article.body && (
        <div className="mt-6">
          <MarkdownContent markdown={article.body} />
        </div>
      )}
    </div>
  );
}
