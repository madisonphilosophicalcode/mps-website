import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundContent from "@/components/NotFoundContent";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-[50px] pt-2.5">
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center justify-center gap-[50px]">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
}
