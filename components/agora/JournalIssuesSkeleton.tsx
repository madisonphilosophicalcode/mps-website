import Skeleton from "@/components/Skeleton";

export default function JournalIssuesSkeleton() {
  return (
    <div className="flex w-full flex-col items-start gap-[42px]">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="flex w-full flex-col gap-2.5 rounded-[7px] bg-panel px-5 py-4 md:px-[29px] md:py-5"
        >
          <div className="flex items-end justify-between gap-4">
            <Skeleton className="h-[32px] w-1/2 bg-cream/15" />
            <Skeleton className="h-[31px] w-[60px] shrink-0 bg-cream/15" />
          </div>
          <Skeleton className="h-[14px] w-full bg-cream/10" />
        </div>
      ))}
    </div>
  );
}
