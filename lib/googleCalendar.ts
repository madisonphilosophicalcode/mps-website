export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
  description?: string;
}

const CALENDAR_ID = "madisonphilosophicalsociety@gmail.com";

export const CALENDAR_SUBSCRIBE_URL = `webcal://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`;

interface GoogleCalendarEventsResponse {
  items: Array<{
    id: string;
    summary?: string;
    location?: string;
    description?: string;
    start: { dateTime?: string; date?: string };
    end: { dateTime?: string; date?: string };
  }>;
}

export async function getEventsInRange(
  timeMin: Date,
  timeMax: Date,
): Promise<CalendarEvent[]> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) {
    return [];
  }

  const params = new URLSearchParams({
    key: apiKey,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "250",
  });

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`,
    { next: { revalidate: 300 } },
  );

  if (!res.ok) {
    throw new Error(`Google Calendar API responded with ${res.status}`);
  }

  const data: GoogleCalendarEventsResponse = await res.json();

  return data.items.map((item) => ({
    id: item.id,
    title: item.summary ?? "Untitled Event",
    start: item.start.dateTime ?? item.start.date ?? "",
    end: item.end.dateTime ?? item.end.date ?? "",
    allDay: !item.start.dateTime,
    location: item.location,
    description: item.description,
  }));
}

function toGoogleUtcStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildGoogleAddEventUrl(event: CalendarEvent): string {
  const dates = event.allDay
    ? `${event.start.replace(/-/g, "")}/${event.end.replace(/-/g, "")}`
    : `${toGoogleUtcStamp(event.start)}/${toGoogleUtcStamp(event.end)}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates,
  });
  if (event.description) params.set("details", event.description);
  if (event.location) params.set("location", event.location);

  return `https://calendar.google.com/calendar/render?${params}`;
}
