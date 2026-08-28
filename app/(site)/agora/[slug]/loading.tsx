import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center gap-10 px-6 py-12">
      <div className="grid w-full max-w-[1000px] grid-cols-1 items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <div className="order-2 flex flex-col gap-6 md:order-1">
          <Skeleton className="h-[48px] w-2/3 bg-ink/15" />
          <div className="flex flex-col gap-2 border-l-2 border-ink/10 pl-5">
            <Skeleton className="h-[14px] w-full bg-ink/10" />
            <Skeleton className="h-[14px] w-full bg-ink/10" />
            <Skeleton className="h-[14px] w-5/6 bg-ink/10" />
            <Skeleton className="h-[14px] w-2/3 bg-ink/10" />
          </div>
          <Skeleton className="h-[38px] w-[180px] bg-ink/15" />
        </div>
        <div className="order-1 mx-auto w-full max-w-[360px] md:order-2 md:mx-0 md:ml-auto">
          <Skeleton className="aspect-[8.5/11] w-full rounded-[4px] bg-ink/15" />
        </div>
      </div>
      <div className="flex w-full max-w-[700px] flex-col gap-6">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col gap-3 py-6">
            <Skeleton className="h-[32px] w-1/2 bg-ink/15" />
            <Skeleton className="h-[13px] w-1/4 bg-ink/10" />
            <Skeleton className="h-[15px] w-full bg-ink/10" />
            <Skeleton className="h-[15px] w-full bg-ink/10" />
            <Skeleton className="h-[15px] w-2/3 bg-ink/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
