import type { Metadata } from "next";
import LinkButton from "@/components/LinkButton";
import SocialIcons from "@/components/SocialIcons";
import { bioLinks, fallbackSocialLinks } from "@/data/links";
import { getLinksPage } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "MPS Links",
  robots: { index: false, follow: false },
};

export default async function LinksPage() {
  const linksPage = await getLinksPage();

  const links =
    linksPage && linksPage.links.length > 0
      ? linksPage.links.map((link) => ({
          label: link.label,
          href: link.url,
          external: link.url.startsWith("http"),
          image: link.image ? urlFor(link.image).width(80).url() : undefined,
        }))
      : bioLinks;

  const socialLinks =
    linksPage && linksPage.socialLinks.length > 0
      ? linksPage.socialLinks
      : fallbackSocialLinks;

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-10 bg-[#1c1c1c] px-6 py-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-serif text-5xl tracking-[7px] text-cream italic">
          MPS
        </p>
        <p className="font-mono text-sm text-gold italic">
          Madison Philosophical Society
        </p>
      </div>
      <div className="flex w-full max-w-[420px] flex-col gap-4">
        {links.map((link) => (
          <LinkButton key={link.href + link.label} link={link} />
        ))}
      </div>
      <SocialIcons links={socialLinks} />
    </div>
  );
}
