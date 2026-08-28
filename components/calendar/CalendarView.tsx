"use client";

import { useState } from "react";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import EventModal from "@/components/calendar/EventModal";
import type { CalendarEvent } from "@/lib/googleCalendar";

export default function CalendarView({
  events,
  termStart,
  termEnd,
}: {
  events: CalendarEvent[];
  termStart: string;
  termEnd: string;
}) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  return (
    <>
      <CalendarGrid
        events={events}
        termStart={termStart}
        termEnd={termEnd}
        onSelectEvent={setSelectedEvent}
      />
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
