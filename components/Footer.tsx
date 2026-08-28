import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-start gap-8 bg-panel px-6 pt-8 pb-7 text-white sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-8 sm:gap-y-6 sm:px-25">
      <div className="flex flex-col gap-1.5">
        <p className="font-serif text-lg text-gold italic">MPS</p>
        <p className="font-mono text-xs">{site.tagline}</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-serif text-lg text-gold italic">Socials</p>
        <ul className="list-disc font-mono text-xs">
          <li className="ms-[18px]">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/40 underline-offset-2 transition-colors duration-300 hover:text-gold hover:decoration-gold"
            >
              Instagram
            </a>
          </li>
          <li className="ms-[18px]">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/40 underline-offset-2 transition-colors duration-300 hover:text-gold hover:decoration-gold"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
      <div className="font-mono text-xs italic">
        <p>Copyright MPS©</p>
        <p>University of Wisconsin-Madison Philosophy Department</p>
      </div>
      <div className="font-mono text-xs italic">
        <p>Designed in Figma</p>
        <p>Crafted with Next</p>
        <p>Built with Love</p>
        <p className="text-gold">-Mark Stanley</p>
      </div>
    </footer>
  );
}
