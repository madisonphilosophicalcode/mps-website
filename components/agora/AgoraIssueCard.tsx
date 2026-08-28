import type { AgoraIssue } from "@/data/agora-issues";
import type { SanityAgoraArticle } from "@/lib/sanity/queries";
import AgoraTopicsList from "@/components/agora/AgoraTopicsList";

export default function AgoraIssueCard({
  issue,
  articles = [],
}: {
  issue: AgoraIssue;
  articles?: SanityAgoraArticle[];
}) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-[7px] bg-panel px-5 py-4 transition-shadow duration-300 hover:shadow-xl md:px-[29px] md:py-5">
      <div className="flex items-end justify-between gap-4">
        <p className="min-w-0 font-serif text-2xl text-cream italic md:text-32">
          {issue.title}
        </p>
        <a
          href={issue.href}
          className="shrink-0 rounded-[5px] border border-gold bg-maroon px-[7px] py-[5px] font-mono text-base text-cream italic transition-all duration-300 hover:scale-[1.05] hover:bg-maroon/85"
        >
          Read
        </a>
      </div>
      <AgoraTopicsList
        topics={issue.topics}
        articles={articles}
        issueHref={issue.href}
      />
    </div>
  );
}
