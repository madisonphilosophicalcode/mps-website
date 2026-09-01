import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/structuredData";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-[50px] pt-2.5">
      <JsonLd data={organizationSchema()} />
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center justify-center gap-[50px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
