"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { LOGO_IMAGE, ScrollLink } from "../data/homeData";

function LanguageToggle({
  language,
  onChange,
}: {
  language: "vi" | "en";
  onChange: (language: "vi" | "en") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <a
        href="#quick-booking"
        className="group hidden items-center gap-1.5 rounded-full bg-[#d9b291] px-3.5 py-2 text-[9px] font-extrabold text-[#26352b] no-underline shadow-[0_8px_18px_rgba(18,30,20,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#efc9aa] hover:shadow-[0_12px_24px_rgba(18,30,20,0.24)] focus:outline-none focus:ring-2 focus:ring-[#d9b291]/70 sm:inline-flex"
      >
        <span>Đặt phòng ngay</span>
        <ArrowRight
          size={12}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>
      <div
        className="flex items-center rounded-full border border-white/25 bg-[#26352b]/65 p-1 text-[9px] font-extrabold text-white shadow-[0_8px_22px_rgba(17,25,17,0.18)] backdrop-blur-md"
        aria-label="Chọn ngôn ngữ"
      >
        <button
          type="button"
          onClick={() => onChange("vi")}
          aria-pressed={language === "vi"}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${language === "vi" ? "bg-[#d9b291] text-[#26352b]" : "text-white/65 hover:text-white"}`}
        >
          VI
        </button>
        <button
          type="button"
          onClick={() => onChange("en")}
          aria-pressed={language === "en"}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${language === "en" ? "bg-[#d9b291] text-[#26352b]" : "text-white/65 hover:text-white"}`}
        >
          EN
        </button>
      </div>
    </div>
  );
}

export function Header() {
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 border-b transition-all duration-300 ${scrolled ? "border-white/10 bg-[#26352b]/92 py-2 shadow-[0_10px_30px_rgba(17,25,17,0.18)] backdrop-blur-xl" : "border-transparent bg-transparent py-5"}`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a
            href="#top"
            className="flex items-center gap-3 text-white no-underline"
          >
            <span className="grid size-10 place-items-center rounded-[12px_12px_12px_3px] border border-white/40 bg-white/10 backdrop-blur-[6px]">
              <Image
                src={LOGO_IMAGE}
                alt="Logo Lưu Trú Nhỏ"
                width={28}
                height={28}
                className="size-7 object-contain brightness-0 invert"
              />
            </span>
            <span>
              <span className="block font-display text-[21px] leading-none">
                Lưu Trú Nhỏ
              </span>
              <span className="mt-1 block text-[8px] font-extrabold uppercase tracking-[0.19em] text-white/70">
                homestay & nhà nghỉ
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[11px] font-extrabold tracking-[0.06em] text-white/82 lg:flex">
            <ScrollLink href="#stay">Không gian</ScrollLink>
            <ScrollLink href="#day">Một ngày</ScrollLink>
            <ScrollLink href="#nearby">Gợi ý quanh nhà</ScrollLink>
            <ScrollLink href="#faq">Hỏi đáp</ScrollLink>
            <ScrollLink href="#contact-info">Liên hệ</ScrollLink>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle language={language} onChange={setLanguage} />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-white/35 bg-white/10 text-white lg:hidden"
              aria-label="Mở menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#24362b] p-6 text-white lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-[24px]">Lưu Trú Nhỏ</span>
            <button
              type="button"
              onClick={closeMenu}
              className="grid size-10 place-items-center rounded-full border border-white/20"
              aria-label="Đóng menu"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="mt-20 grid gap-6 font-display text-[32px]">
            <ScrollLink href="#stay" onClick={closeMenu}>
              Không gian
            </ScrollLink>
            <ScrollLink href="#day" onClick={closeMenu}>
              Một ngày
            </ScrollLink>
            <ScrollLink href="#nearby" onClick={closeMenu}>
              Gợi ý quanh nhà
            </ScrollLink>
            <ScrollLink href="#faq" onClick={closeMenu}>
              Hỏi đáp
            </ScrollLink>
            <ScrollLink href="#contact-info" onClick={closeMenu}>
              Liên hệ
            </ScrollLink>
          </nav>
          <Link
            href="/login"
            onClick={closeMenu}
            className="mt-auto flex h-12 items-center justify-center rounded-lg bg-[#d9b291] text-[12px] font-extrabold text-[#3a4a38] no-underline"
          >
            Khu quản lý
          </Link>
        </div>
      )}
    </>
  );
}
