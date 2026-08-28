import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BoardSection from "@/components/board/BoardSection";
import { getBoards } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "About | Madison Philosophical Society",
};

export default async function AboutPage() {
  const boards = await getBoards();

  return (
    <div className="flex w-full flex-col items-center gap-14 px-6 py-12">
      <PageHero title="ABOUT MPS" />

      <div className="flex w-full max-w-[700px] flex-col gap-4">
        <p className="font-mono text-13 leading-relaxed text-ink/80 sm:text-15">
          Madison Philosophical Society (MPS) at the University of
          Wisconsin-Madison exists to facilitate philosophical inquiry, critical
          thinking, and intellectual discourse among students. We were created
          to foster community in the (undergraduate) philosophy majors, as well
          as those interested in philosophy in general. We believe the
          discussion of philosophical ideas is invaluable for the education and
          growth of any philosophy major and the student body.
        </p>
        <p className="font-mono text-13 leading-relaxed text-ink/80 sm:text-15">
          Through seminars, discussions, and community events, we foster a
          community of individuals passionate about exploring fundamental
          questions about existence, knowledge, ethics, and the nature of
          reality (and other philosophical topics). MPS is a place where
          students (philosophy major or not) can swap ideas freely, and feel
          welcome to express their views.
        </p>
      </div>

      <BoardSection boards={boards} />
    </div>
  );
}
