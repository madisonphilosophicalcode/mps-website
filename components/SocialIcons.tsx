import type { BioSocialLink } from "@/data/links";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons: Record<string, React.ReactNode> = {
  instagram: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg {...iconProps}>
      <path d="M15 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M15 3c0 2.5 2 4.5 4.5 4.5" />
    </svg>
  ),
  youtube: (
    <svg {...iconProps}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10 9.5v5l4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  twitter: (
    <svg {...iconProps}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  ),
  discord: (
    <svg {...iconProps}>
      <rect x="3" y="7" width="18" height="11" rx="5" />
      <circle cx="9" cy="12.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12.05 0C5.495 0 .16 5.334.16 11.891c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652c1.746.953 3.71 1.454 5.706 1.454h.005c6.554 0 11.89-5.335 11.89-11.892 0-3.176-1.237-6.16-3.484-8.406A11.826 11.826 0 0 0 12.05 0zm0 21.696h-.004a9.83 9.83 0 0 1-5.01-1.37l-.36-.214-3.756.98 1.002-3.66-.235-.375a9.813 9.813 0 0 1-1.505-5.166c0-5.421 4.415-9.834 9.877-9.834a9.83 9.83 0 0 1 6.988 2.896 9.795 9.795 0 0 1 2.884 6.945c0 5.421-4.414 9.833-9.881 9.833z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  ),
  email: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 6.5l9 6 9-6" />
    </svg>
  ),
};

export default function SocialIcons({ links }: { links: BioSocialLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.platform}
          className="text-cream transition-all duration-300 hover:scale-110 hover:text-maroon"
        >
          <span className="block size-[26px]">
            {icons[link.platform] ?? icons.email}
          </span>
        </a>
      ))}
    </div>
  );
}
