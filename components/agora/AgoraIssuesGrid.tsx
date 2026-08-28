import AgoraIssueCard from "@/components/agora/AgoraIssueCard";
import { agoraIssues as fallbackAgoraIssues } from "@/data/agora-issues";
import { getAgoraIssues } from "@/lib/sanity/queries";

export default async function AgoraIssuesGrid() {
  const sanityIssues = await getAgoraIssues();
  const hasSanityIssues = sanityIssues.length > 0;

  return (
    <>
      {hasSanityIssues
        ? sanityIssues.map((issue) => (
            <AgoraIssueCard
              key={issue.title}
              issue={{
                title: issue.title,
                topics: issue.topicsTeaser ?? "",
                href: `/agora/${issue.slug}`,
              }}
              articles={issue.articles ?? []}
            />
          ))
        : fallbackAgoraIssues.map((issue) => (
            <AgoraIssueCard key={issue.title} issue={issue} />
          ))}
    </>
  );
}
