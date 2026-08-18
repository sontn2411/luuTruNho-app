import { Footer } from "@/components/home/sections/Footer";
import { Header } from "@/components/home/sections/Header";
import { ScrollToTop } from "@/components/home/components/ScrollToTop";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="marketing-home min-h-screen overflow-x-hidden bg-[#f3f0e8] text-[#26352b]">
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.055] mix-blend-multiply grain-texture"
        aria-hidden="true"
      />

      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </main>
  );
}
