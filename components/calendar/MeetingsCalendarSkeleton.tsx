import Skeleton from "@/components/Skeleton";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MeetingsCalendarSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-[28px] w-[28px] bg-ink/10" />
        <Skeleton className="h-[28px] w-[180px] bg-ink/10" />
        <Skeleton className="h-[28px] w-[28px] bg-ink/10" />
      </div>
      <div className="grid grid-cols-7 border-t border-l border-ink/15">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="border-r border-b border-ink/15 py-2 text-center font-mono text-xs text-ink/60 italic"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="min-h-[90px] border-r border-b border-ink/15 p-2 sm:min-h-[110px]"
          >
            <Skeleton className="h-[12px] w-[16px] bg-ink/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
