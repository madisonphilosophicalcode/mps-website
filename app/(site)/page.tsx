import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import JournalIssuesList from "@/components/agora/JournalIssuesList";
import JournalIssuesSkeleton from "@/components/agora/JournalIssuesSkeleton";
import GallerySection from "@/components/gallery/GallerySection";
import GallerySkeleton from "@/components/gallery/GallerySkeleton";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <div className="relative aspect-[1691/784] min-h-[240px] w-full overflow-hidden px-[15px]">
        <Image
          src="/images/hero-temple.png"
          alt="Ancient Greek temple"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative flex h-full flex-col items-center justify-center">
          <p
            className="mb-[-0.09em] w-full text-center leading-none font-serif text-cream italic"
            style={{
              fontSize: "clamp(3rem, 20vw, 350px)",
              letterSpacing: "clamp(0.5rem, 3.1vw, 52.5px)",
            }}
          >
            MPS
          </p>
          <p
            className="w-full text-right leading-none font-serif text-cream italic"
            style={{
              fontSize: "clamp(3rem, 20vw, 350px)",
              letterSpacing: "clamp(0.5rem, 3.1vw, 52.5px)",
            }}
          >
            AGORA
          </p>
        </div>
      </div>

      <section className="flex w-full flex-col items-center px-6 py-16 md:px-3">
        <div className="flex w-full max-w-[1200px] flex-col items-start gap-8 rounded-3xl border border-ink/15 p-8 sm:p-12 md:p-16">
          <h2 className="font-serif text-26 tracking-[3px] text-ink italic sm:text-4xl sm:tracking-[5.4px]">
            About MPS
          </h2>
          <p className="max-w-[1126px] font-mono text-13 tracking-[1px] text-ink italic sm:text-base sm:tracking-[2.4px]">
            MPS is the University of Wisconsin-Madison&rsquo;s student-ran
            philosophy club. We have weekly philosophical discussion, including
            presentations, talks, discussions, debates, and more. We provide a
            dedicated weekly time not only to philosophize, but to socialize
            with like-minded thinkers. We also promote and host social events.
          </p>
          <Button href="/calendar">Check Meetings Here</Button>
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-[42px] px-6 py-12 md:px-[23px]">
        <div className="flex w-full flex-col items-center gap-4 italic">
          <h2
            className="text-center font-serif font-medium text-ink"
            style={{
              fontSize: "clamp(2rem, 5.7vw, 96px)",
              letterSpacing: "clamp(0.15rem, 0.85vw, 14.4px)",
            }}
          >
            AGORA
          </h2>
          <div className="flex w-full flex-col items-center justify-between gap-2 font-mono text-13 text-ink sm:flex-row sm:text-base">
            <p>Agora is MPS&rsquo;s undergraduate philosophy journal.</p>
            <Link
              href="/agora"
              className="underline underline-offset-2 transition-colors duration-300 hover:text-maroon"
            >
              Read More Here
            </Link>
          </div>
        </div>
        <Suspense fallback={<JournalIssuesSkeleton />}>
          <JournalIssuesList />
        </Suspense>
      </section>

      <section className="w-full bg-panel px-6 py-16 md:px-[107px]">
        <h2
          className="mb-10 -rotate-[0.34deg] text-center font-serif text-white italic"
          style={{
            fontSize: "clamp(2rem, 6vw, 100px)",
            letterSpacing: "clamp(0.2rem, 1.2vw, 20px)",
          }}
        >
          GALLERY
        </h2>
        <Suspense fallback={<GallerySkeleton />}>
          <GallerySection />
        </Suspense>
      </section>

      <section className="flex w-full flex-col items-center gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-[107px]">
        <p
          className="max-w-[565px] font-serif text-ink italic"
          style={{ fontSize: "clamp(1.75rem, 3.8vw, 64px)" }}
        >
          &ldquo;The unexamined life is not worth living.&rdquo;{" "}
          <span className="text-maroon whitespace-nowrap">-Socrates</span>
        </p>
        <div className="flex w-full max-w-[609px] flex-col gap-6 bg-panel px-8 py-16 text-white">
          <h2
            className="font-serif italic"
            style={{ fontSize: "clamp(1.75rem, 3.8vw, 64px)" }}
          >
            Interested?
          </h2>
          <p className="max-w-[432px] font-mono text-13 italic sm:text-base">
            Sounds like something you would like to join?{" "}
            <a
              href={site.mailingListUrl}
              className="text-gold underline decoration-solid transition-colors duration-300 hover:text-cream"
            >
              Click here
            </a>{" "}
            <span className="text-cream">to join our email list.</span>{" "}
            <span className="text-cream">
              Show up to our next meeting Monday, and bring a friend!
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
