import AgoraIssueCard from "@/components/agora/AgoraIssueCard";
import { agoraIssues as fallbackAgoraIssues } from "@/data/agora-issues";
import { getAgoraIssues } from "@/lib/sanity/queries";

const HOMEPAGE_ISSUE_LIMIT = 4;

export default async function JournalIssuesList() {
  const sanityIssues = await getAgoraIssues();

  const agoraIssues = (
    sanityIssues.length > 0
      ? sanityIssues.map((issue) => ({
          title: issue.title,
          topics: issue.topicsTeaser ?? "",
          href: `/agora/${issue.slug}`,
        }))
      : fallbackAgoraIssues
  ).slice(0, HOMEPAGE_ISSUE_LIMIT);

  return (
    <div className="flex w-full flex-col items-start gap-[42px]">
      {agoraIssues.map((issue) => (
        <AgoraIssueCard key={issue.title} issue={issue} />
      ))}
    </div>
  );
}
