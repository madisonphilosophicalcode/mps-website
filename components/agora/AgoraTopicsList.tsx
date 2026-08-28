import Link from "next/link";
import { slugify } from "@/lib/slug";
import type { SanityAgoraArticle } from "@/lib/sanity/queries";

export default function AgoraTopicsList({
  topics,
  articles,
  issueHref,
}: {
  topics: string;
  articles: SanityAgoraArticle[];
  issueHref: string;
}) {
  if (articles.length === 0) {
    return (
      <p className="font-mono text-xs text-gold italic sm:text-sm">
        {topics}
      </p>
    );
  }

  return (
    <p className="font-mono text-xs text-gold italic sm:text-sm">
      {articles.map((article, i) => (
        <span key={article.title}>
          <Link
            href={`${issueHref}#${slugify(article.title)}`}
            className="underline decoration-gold/40 underline-offset-2 transition-colors duration-300 hover:text-cream hover:decoration-cream"
          >
            {article.title}
          </Link>
          {i < articles.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}
