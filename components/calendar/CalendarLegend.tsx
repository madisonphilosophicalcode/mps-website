import {
  categoryLabels,
  categoryStyles,
  type EventCategory,
} from "@/lib/eventCategory";

const CATEGORY_ORDER: EventCategory[] = [
  "meeting",
  "board",
  "reading",
  "other",
];

export default function CalendarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-10 text-ink/60 italic sm:text-xs">
      {CATEGORY_ORDER.map((category) => (
        <span key={category} className="flex items-center gap-1.5">
          <span
            aria-hidden
            className={`size-[9px] rounded-[3px] ${categoryStyles[category].swatchClass}`}
          />
          {categoryLabels[category]}
        </span>
      ))}
    </div>
  );
}
