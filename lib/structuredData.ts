/**
 * Builders for the schema.org JSON-LD payloads embedded in the site.
 *
 * The Organization payload is the entity anchor: `alternateName` and `sameAs`
 * are what tell search engines that "MPS", the WIN listing under "Philosophical
 * Society", and the Instagram account are all one organization.
 */

import { site } from "@/data/site";
import type { CalendarEvent } from "@/lib/googleCalendar";

export type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${site.url}/#organization`;

const DESCRIPTION =
  "Madison Philosophical Society (MPS) is the University of Wisconsin-Madison's student-run philosophy club, hosting weekly discussions, talks, and debates, and publishing the undergraduate philosophy journal Agora.";

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Madison Philosophical Society",
    alternateName: ["MPS", "Philosophical Society"],
    url: site.url,
    email: site.email,
    description: DESCRIPTION,
    logo: `${site.url}/android-chrome-512x512.png`,
    image: `${site.url}/images/hero-temple.png`,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "University of Wisconsin-Madison",
      url: "https://www.wisc.edu",
    },
    location: {
      "@type": "Place",
      name: "Helen C. White Hall",
      address: {
        "@type": "PostalAddress",
        streetAddress: "600 N. Park Street",
        addressLocality: "Madison",
        addressRegion: "WI",
        postalCode: "53706",
        addressCountry: "US",
      },
    },
    sameAs: [
      site.instagramUrl,
      // the WIN url google actually has indexed; /philosophicalsociety/ is
      // login-gated and redirects
      "https://win.wisc.edu/organization/philosophicalsociety",
      "https://philosophy.wisc.edu/undergraduate-program-2/philosophy-clubs-undergraduates/",
    ],
  };
}

/**
 * Maps Google Calendar events onto schema.org Event nodes.
 *
 * Past events are dropped: Google only surfaces upcoming events in results, and
 * stale entries dilute the payload. Returns null when nothing is upcoming so
 * callers can skip rendering an empty graph.
 */
export function eventListSchema(
  events: CalendarEvent[],
  now: Date = new Date(),
): JsonLd | null {
  const upcoming = events.filter((event) => new Date(event.end) >= now);
  if (upcoming.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@graph": upcoming.map((event) => ({
      "@type": "Event",
      name: event.title,
      startDate: event.start,
      endDate: event.end,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      ...(event.description && { description: event.description }),
      location: event.location
        ? { "@type": "Place", name: event.location }
        : {
            "@type": "Place",
            name: "Helen C. White Hall",
            address: {
              "@type": "PostalAddress",
              streetAddress: "600 N. Park Street",
              addressLocality: "Madison",
              addressRegion: "WI",
              postalCode: "53706",
              addressCountry: "US",
            },
          },
      organizer: { "@id": ORGANIZATION_ID },
      isAccessibleForFree: true,
    })),
  };
}
