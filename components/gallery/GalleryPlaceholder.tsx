import Image from "next/image";

export default function GalleryPlaceholder({
  label,
  src,
}: {
  label: string;
  src?: string;
}) {
  if (src) {
    return (
      <div className="relative size-full overflow-hidden rounded-[8px]">
        <Image
          src={src}
          alt={label}
          fill
          sizes="(min-width: 907px) 400px, 44vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex size-full items-center justify-center rounded-[8px] border border-gold/40 bg-gradient-to-br from-gold/20 to-panel">
      <p className="px-4 text-center font-mono text-sm text-gold italic">
        {label}
      </p>
    </div>
  );
}
