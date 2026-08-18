"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      className={`fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-white/20 bg-[#26352b]/85 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#d9b291] hover:bg-[#3a4a38] hover:text-[#d9b291] ${
        showScrollTop
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={19} />
    </button>
  );
}
