"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { CalendarEvent } from "@/lib/googleCalendar";
import {
  categorizeEvent,
  categoryStyles,
  parseMeetingType,
  meetingTypeDotColor,
} from "@/lib/eventCategory";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function monthIndex(year: number, month: number): number {
  return year * 12 + month;
}

interface DayCell {
  day: number;
  dateKey: string;
  events: CalendarEvent[];
  isOutsideMonth: boolean;
}

export default function CalendarGrid({
  events,
  termStart,
  termEnd,
  onSelectEvent,
}: {
  events: CalendarEvent[];
  termStart: string;
  termEnd: string;
  onSelectEvent: (event: CalendarEvent) => void;
}) {
  const termStartDate = new Date(termStart);
  const termEndDate = new Date(termEnd);

  const [cursor, setCursor] = useState({
    year: termStartDate.getUTCFullYear(),
    month: termStartDate.getUTCMonth(),
  });

  const minIndex = monthIndex(
    termStartDate.getUTCFullYear(),
    termStartDate.getUTCMonth(),
  );
  const maxIndex = monthIndex(
    termEndDate.getUTCFullYear(),
    termEndDate.getUTCMonth(),
  );
  const currentIndex = monthIndex(cursor.year, cursor.month);

  const canGoPrev = currentIndex > minIndex;
  const canGoNext = currentIndex < maxIndex;

  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const key = event.start.slice(0, 10);
    const list = eventsByDate.get(key) ?? [];
    list.push(event);
    eventsByDate.set(key, list);
  }

  const firstOfMonth = new Date(Date.UTC(cursor.year, cursor.month, 1));
  const daysInMonth = new Date(
    Date.UTC(cursor.year, cursor.month + 1, 0),
  ).getUTCDate();
  const leadingBlanks = firstOfMonth.getUTCDay();

  const prevMonth = cursor.month === 0 ? 11 : cursor.month - 1;
  const prevYear = cursor.month === 0 ? cursor.year - 1 : cursor.year;
  const daysInPrevMonth = new Date(
    Date.UTC(prevYear, prevMonth + 1, 0),
  ).getUTCDate();

  const nextMonth = cursor.month === 11 ? 0 : cursor.month + 1;
  const nextYear = cursor.month === 11 ? cursor.year + 1 : cursor.year;

  function makeCell(
    year: number,
    month: number,
    day: number,
    isOutsideMonth: boolean,
  ): DayCell {
    const dateKey = `${year}-${pad(month + 1)}-${pad(day)}`;
    return {
      day,
      dateKey,
      events: eventsByDate.get(dateKey) ?? [],
      isOutsideMonth,
    };
  }

  const cells: DayCell[] = [];
  for (let i = 0; i < leadingBlanks; i++) {
    const day = daysInPrevMonth - leadingBlanks + 1 + i;
    cells.push(makeCell(prevYear, prevMonth, day, true));
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(makeCell(cursor.year, cursor.month, day, false));
  }
  let trailingDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push(makeCell(nextYear, nextMonth, trailingDay, true));
    trailingDay++;
  }

  function goPrev() {
    if (!canGoPrev) return;
    setCursor((c) =>
      c.month === 0
        ? { year: c.year - 1, month: 11 }
        : { year: c.year, month: c.month - 1 },
    );
  }

  function goNext() {
    if (!canGoNext) return;
    setCursor((c) =>
      c.month === 11
        ? { year: c.year + 1, month: 0 }
        : { year: c.year, month: c.month + 1 },
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <motion.button
          type="button"
          aria-label="Previous month"
          onClick={goPrev}
          disabled={!canGoPrev}
          whileHover={canGoPrev ? { scale: 1.1 } : undefined}
          whileTap={canGoPrev ? { scale: 0.9 } : undefined}
          className="cursor-pointer font-serif text-xl text-ink italic disabled:cursor-not-allowed disabled:opacity-20 sm:text-28"
        >
          &#8592;
        </motion.button>
        <AnimatePresence mode="wait">
          <motion.h2
            key={`${cursor.year}-${cursor.month}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-serif text-xl text-ink italic sm:text-28"
          >
            {MONTH_FORMAT.format(firstOfMonth)}
          </motion.h2>
        </AnimatePresence>
        <motion.button
          type="button"
          aria-label="Next month"
          onClick={goNext}
          disabled={!canGoNext}
          whileHover={canGoNext ? { scale: 1.1 } : undefined}
          whileTap={canGoNext ? { scale: 0.9 } : undefined}
          className="cursor-pointer font-serif text-xl text-ink italic disabled:cursor-not-allowed disabled:opacity-20 sm:text-28"
        >
          &#8594;
        </motion.button>
      </div>

      <div className="grid grid-cols-7 border-t border-l border-ink/15">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="border-r border-b border-ink/15 py-1 text-center font-mono text-10 text-ink/60 italic sm:py-2 sm:text-xs"
          >
            <span className="sm:hidden">{weekday[0]}</span>
            <span className="hidden sm:inline">{weekday}</span>
          </div>
        ))}
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`flex min-h-[84px] flex-col gap-1 border-r border-b border-ink/15 p-1 sm:min-h-[110px] sm:p-2 ${cell.isOutsideMonth ? "bg-ink/[0.02]" : ""}`}
          >
            <p
              className={`font-mono text-10 italic sm:text-xs ${cell.isOutsideMonth ? "text-ink/30" : "text-ink/70"}`}
            >
              {cell.day}
            </p>
            <div className="flex flex-col gap-0.5 sm:gap-1">
              {cell.events.map((event) => {
                const category = categorizeEvent(event.title);
                const { meetingType } = parseMeetingType(event.description);
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelectEvent(event)}
                    className={`relative cursor-pointer overflow-hidden [text-overflow:clip] rounded-[4px] py-0.5 pr-2 pl-1 text-left font-mono text-9 whitespace-nowrap italic transition-colors duration-200 sm:truncate sm:py-1 sm:pr-4 sm:pl-1.5 sm:text-11 sm:[text-overflow:ellipsis] ${categoryStyles[category].chipClass}`}
                  >
                    {event.title}
                    {meetingType && (
                      <>
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-[3px] sm:hidden"
                          style={{
                            backgroundColor: meetingTypeDotColor[meetingType],
                          }}
                        />
                        <span
                          aria-hidden
                          className="absolute top-1/2 right-1.5 hidden size-[6px] -translate-y-1/2 rounded-full sm:block"
                          style={{
                            backgroundColor: meetingTypeDotColor[meetingType],
                          }}
                        />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
