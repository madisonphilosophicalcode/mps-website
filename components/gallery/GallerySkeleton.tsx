import Skeleton from "@/components/Skeleton";

export default function GallerySkeleton() {
  return (
    <div className="relative mx-auto aspect-[907/524] w-full max-w-[907px]">
      <Skeleton className="absolute top-[0%] left-[0%] h-[81.11%] w-[37.49%] bg-cream/10" />
      <Skeleton className="absolute top-[0%] left-[62.51%] h-[81.11%] w-[37.49%] bg-cream/10" />
      <Skeleton className="absolute top-[4.58%] left-[29.11%] h-[95.42%] w-[44.10%] bg-cream/15" />
    </div>
  );
}
