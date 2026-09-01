import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AgoraIssuesGrid from "@/components/agora/AgoraIssuesGrid";
import AgoraIssuesSkeleton from "@/components/agora/AgoraIssuesSkeleton";

export const metadata: Metadata = {
  title: "Agora — Undergraduate Philosophy Journal",
  description:
    "Agora is the undergraduate philosophy journal of the Madison Philosophical Society at UW-Madison. Read every issue, featuring original work by undergraduate philosophers.",
  alternates: { canonical: "/agora" },
};

export default function AgoraPage() {
  return (
    <div className="flex w-full flex-col items-center gap-12 px-6 py-12">
      <PageHero title="AGORA" />
      <div className="flex w-full max-w-[1453px] flex-col gap-[42px]">
        <Suspense fallback={<AgoraIssuesSkeleton />}>
          <AgoraIssuesGrid />
        </Suspense>
      </div>
    </div>
  );
}
