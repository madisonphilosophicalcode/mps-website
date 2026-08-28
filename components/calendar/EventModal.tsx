"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/Button";
import type { CalendarEvent } from "@/lib/googleCalendar";
import { buildGoogleAddEventUrl } from "@/lib/googleCalendar";
import {
  parseMeetingType,
  meetingTypeLabels,
  meetingTypeDotColor,
} from "@/lib/eventCategory";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

function formatWhen(event: CalendarEvent): string {
  if (event.allDay) {
    return DATE_FORMAT.format(new Date(`${event.start}T00:00:00`));
  }
  const start = new Date(event.start);
  const end = new Date(event.end);
  return `${DATE_FORMAT.format(start)} · ${TIME_FORMAT.format(start)} – ${TIME_FORMAT.format(end)}`;
}

export default function EventModal({
  event,
  onClose,
}: {
  event: CalendarEvent | null;
  onClose: () => void;
}) {
  const { meetingType, cleanedDescription } = event
    ? parseMeetingType(event.description)
    : { meetingType: null, cleanedDescription: "" };

  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!event) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[480px] rounded-[8px] bg-panel p-8 focus:outline-none"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 cursor-pointer font-mono text-lg text-cream/60 transition-colors duration-200 hover:text-maroon"
            >
              &#10005;
            </button>
            <h2
              id="event-modal-title"
              className="pr-8 font-serif text-28 text-cream italic"
            >
              {event.title}
            </h2>
            <p className="mt-2 font-mono text-sm text-gold italic">
              {formatWhen(event)}
            </p>
            {event.location && (
              <p className="mt-1 font-mono text-13 text-cream/70 italic">
                {event.location}
              </p>
            )}
            {meetingType && (
              <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-cream/20 px-3 py-1 font-mono text-xs text-cream italic">
                <span
                  aria-hidden
                  className="size-[8px] rounded-full"
                  style={{ backgroundColor: meetingTypeDotColor[meetingType] }}
                />
                {meetingTypeLabels[meetingType]}
              </span>
            )}
            {cleanedDescription && (
              <p className="mt-4 font-mono text-13 whitespace-pre-line text-cream/80 italic">
                {cleanedDescription}
              </p>
            )}
            <Button
              href={buildGoogleAddEventUrl(event)}
              external
              className="mt-6"
            >
              Add to Calendar
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
