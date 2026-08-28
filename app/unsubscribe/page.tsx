import type { Metadata } from "next";
import UnsubscribeForm from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe | MPS Mailing List",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-[#1c1c1c] px-6 py-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-serif text-5xl tracking-[7px] text-cream italic">
          MPS
        </p>
        <p className="font-mono text-sm text-gold italic">
          Unsubscribe from the mailing list
        </p>
      </div>
      <UnsubscribeForm />
    </div>
  );
}
