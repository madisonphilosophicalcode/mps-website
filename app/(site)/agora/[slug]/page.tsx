import Image from "next/image";
import { notFound } from "next/navigation";
import AgoraArticleSection from "@/components/agora/AgoraArticleSection";
import Button from "@/components/Button";
import MarkdownContent from "@/components/MarkdownContent";
import { getAgoraIssueBySlug, getAgoraIssues } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { slugify } from "@/lib/slug";

export async function generateStaticParams() {
  const issues = await getAgoraIssues();
  return issues.map((issue) => ({ slug: issue.slug }));
}

export default async function AgoraIssuePage(
  props: PageProps<"/agora/[slug]">,
) {
  const { slug } = await props.params;
  const issue = await getAgoraIssueBySlug(slug);

  if (!issue) notFound();

  const pdfUrl = issue.pdf?.asset?.url;
  const articles = issue.articles ?? [];

  return (
    <div className="flex w-full flex-col items-center gap-10 px-6 py-12">
      <div className="grid w-full max-w-[1000px] grid-cols-1 items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <div className="order-2 flex flex-col gap-6 md:order-1">
          <h1 className="font-serif text-40 text-ink italic md:text-5xl">
            {issue.title}
          </h1>
          {issue.preface && (
            <div className="border-l-2 border-gold/40 pl-5">
              <MarkdownContent markdown={issue.preface} />
            </div>
          )}
          {pdfUrl && (
            <Button href={pdfUrl} external className="w-fit">
              Read the Full PDF
            </Button>
          )}

          {articles.length > 1 && (
            <div className="flex w-full flex-col gap-2 rounded-[6px] border border-ink/15 px-6 py-5">
              <p className="mb-1 font-mono text-xs tracking-wide text-gold uppercase">
                In This Issue
              </p>
              {articles.map((article) => (
                <a
                  key={article.title}
                  href={`#${slugify(article.title)}`}
                  className="font-mono text-xs text-ink underline underline-offset-2 transition-colors duration-300 hover:text-maroon sm:text-sm"
                >
                  {article.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {issue.coverImage && (
          <div className="order-1 mx-auto w-full max-w-[360px] md:order-2 md:mx-0 md:ml-auto">
            <div className="relative aspect-[8.5/11] w-full overflow-hidden rounded-[4px] border border-ink/10 shadow-xl">
              <Image
                src={urlFor(issue.coverImage).width(800).url()}
                alt={issue.title}
                fill
                sizes="(min-width: 768px) 360px, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
      </div>

      {articles.length > 0 && (
        <div className="flex w-full max-w-[700px] flex-col">
          {articles.map((article) => (
            <AgoraArticleSection
              key={article.title}
              article={article}
              id={slugify(article.title)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
