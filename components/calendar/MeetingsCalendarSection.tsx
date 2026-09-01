import CalendarView from "@/components/calendar/CalendarView";
import JsonLd from "@/components/JsonLd";
import { getEventsInRange } from "@/lib/googleCalendar";
import { getCurrentTerm } from "@/lib/semester";
import { eventListSchema } from "@/lib/structuredData";

export default async function MeetingsCalendarSection() {
  const term = getCurrentTerm();
  const apiKeyConfigured = Boolean(process.env.GOOGLE_CALENDAR_API_KEY);
  let events: Awaited<ReturnType<typeof getEventsInRange>> = [];
  let fetchFailed = false;

  if (apiKeyConfigured) {
    try {
      events = await getEventsInRange(term.start, term.end);
    } catch {
      fetchFailed = true;
    }
  }

  const eventSchema = eventListSchema(events);

  return (
    <>
      {eventSchema && <JsonLd data={eventSchema} />}
      {!apiKeyConfigured && (
        <p className="text-center font-mono text-sm text-ink/70 italic">
          Calendar isn&rsquo;t connected yet &mdash; add a
          GOOGLE_CALENDAR_API_KEY to see upcoming meetings here.
        </p>
      )}
      {apiKeyConfigured && fetchFailed && (
        <p className="text-center font-mono text-sm text-ink/70 italic">
          Couldn&rsquo;t load the calendar right now. Please check back later.
        </p>
      )}
      {apiKeyConfigured && !fetchFailed && (
        <CalendarView
          events={events}
          termStart={term.start.toISOString()}
          termEnd={term.end.toISOString()}
        />
      )}
    </>
  );
}
