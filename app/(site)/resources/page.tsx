import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import {
  quickInfo,
  philosophyStats,
  declareInfo,
  declareSource,
  declareNote,
  majorRequirements,
  requirementsSource,
} from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources | Madison Philosophical Society",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-wide text-gold uppercase">
      {children}
    </p>
  );
}

function SourceLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-fit font-mono text-11 text-ink/40 underline underline-offset-2 transition-colors duration-300 hover:text-maroon"
    >
      Source: {label}
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <div className="flex w-full flex-col items-center gap-14 px-6 py-12">
      <PageHero title="RESOURCES" />

      <div className="grid w-full max-w-[1000px] grid-cols-1 gap-4 sm:grid-cols-2">
        {quickInfo.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 rounded-[6px] border border-ink/15 px-6 py-5"
          >
            <SectionLabel>{item.label}</SectionLabel>
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="font-serif text-lg text-ink italic underline underline-offset-2 transition-colors duration-300 hover:text-maroon break-words"
              >
                {item.value}
              </a>
            ) : (
              <p className="font-serif text-lg text-ink/70 italic break-words">
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-[900px] flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="font-serif text-26 text-ink italic sm:text-4xl">
            Philosophy at UW&ndash;Madison
          </h2>
          <p className="font-mono text-xs text-ink/70 italic sm:text-sm">
            Why the major is worth it, and how to declare
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {philosophyStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-[6px] border border-ink/15 px-5 py-5"
            >
              <SectionLabel>{stat.label}</SectionLabel>
              <p className="font-serif text-22 text-ink italic sm:text-26">
                {stat.value}
              </p>
              <p className="font-mono text-xs text-ink/70 sm:text-13">
                {stat.detail}
              </p>
              {stat.sourceLabel && stat.sourceHref && (
                <SourceLink label={stat.sourceLabel} href={stat.sourceHref} />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl text-ink italic sm:text-2xl">
            <a
              href={declareSource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors duration-300 hover:text-maroon"
            >
              How to Declare
            </a>
          </h3>
          <p className="font-mono text-xs leading-relaxed text-ink/80 sm:text-sm">
            {declareNote}
          </p>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {declareInfo.map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <p className="font-mono text-11 tracking-wide text-ink/50 uppercase">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-mono text-13 text-ink underline underline-offset-2 transition-colors duration-300 hover:text-maroon break-words sm:text-sm"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-mono text-13 text-ink break-words sm:text-sm">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl text-ink italic sm:text-2xl">
            <a
              href={requirementsSource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors duration-300 hover:text-maroon"
            >
              Major Requirements
            </a>
          </h3>
          <ul className="flex flex-col gap-2">
            {majorRequirements.map((req) => (
              <li
                key={req}
                className="flex gap-2 font-mono text-xs text-ink/80 sm:text-sm"
              >
                <span className="text-gold">&bull;</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*<div className="flex w-full max-w-[900px] flex-col gap-10">*/}
      {/*  <div className="flex flex-col gap-2 text-center">*/}
      {/*    <h2 className="font-serif text-4xl text-ink italic">*/}
      {/*      Applying to Graduate School*/}
      {/*    </h2>*/}
      {/*    <p className="font-mono text-sm text-ink/70 italic">*/}
      {/*      Notes for anyone considering a philosophy PhD*/}
      {/*    </p>*/}
      {/*  </div>*/}

      {/*  <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">*/}
      {/*    {gradSchoolSections.map((section) => (*/}
      {/*      <div key={section.title} className="flex flex-col gap-2">*/}
      {/*        <h3 className="font-serif text-xl text-ink italic">*/}
      {/*          {section.title}*/}
      {/*        </h3>*/}
      {/*        <p className="font-mono text-sm leading-relaxed text-ink/80">*/}
      {/*          {section.body}*/}
      {/*        </p>*/}
      {/*        <SourceLink*/}
      {/*          label={section.sourceLabel}*/}
      {/*          href={section.sourceHref}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
