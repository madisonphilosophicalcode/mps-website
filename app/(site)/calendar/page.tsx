import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import CalendarLegend from "@/components/calendar/CalendarLegend";
import MeetingsCalendarSection from "@/components/calendar/MeetingsCalendarSection";
import MeetingsCalendarSkeleton from "@/components/calendar/MeetingsCalendarSkeleton";
import { CALENDAR_SUBSCRIBE_URL } from "@/lib/googleCalendar";
import { getCurrentTerm } from "@/lib/semester";

export const metadata: Metadata = {
  title: "Meetings | Madison Philosophical Society",
};

export default function MeetingsPage() {
  const term = getCurrentTerm();

  return (
    <div className="flex w-full flex-col items-center gap-8 px-6 py-12">
      <PageHero title="CALENDAR" />
      <p className="font-mono text-sm text-gold italic">{term.label}</p>
      <div className="flex w-full max-w-[900px] flex-col gap-6">
        <CalendarLegend />
        <Suspense fallback={<MeetingsCalendarSkeleton />}>
          <MeetingsCalendarSection />
        </Suspense>
        <div className="flex w-full justify-end">
          <Button href={CALENDAR_SUBSCRIBE_URL} external>
            Add All to Calendar
          </Button>
        </div>
      </div>
    </div>
  );
}
