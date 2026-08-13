"use client";

import React from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const HeaderLanguageDropdown: React.FC = () => {
  const { locale, setLocale } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative flex items-center gap-2 px-3.5 h-10 rounded-xl bg-card border border-border/60 shadow-xs text-foreground hover:bg-accent/60 transition-all duration-200 outline-none cursor-pointer"
        aria-label="Chọn ngôn ngữ"
        title={locale === "vi" ? "Tiếng Việt" : "English"}
      >
        <Globe className="w-4.5 h-4.5 text-foreground stroke-[1.75]" />
        <span className="text-xs font-semibold uppercase text-foreground tracking-wide">
          {locale === "vi" ? "VN" : "EN"}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-foreground/70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 p-1.5 rounded-xl">
        <DropdownMenuItem
          onClick={() => setLocale("vi")}
          className={`flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 text-xs font-medium ${
            locale === "vi" ? "bg-accent font-bold text-foreground" : ""
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-base">🇻🇳</span>
            <span>Tiếng Việt</span>
          </span>
          {locale === "vi" && <Check className="w-3.5 h-3.5 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={`flex items-center justify-between cursor-pointer rounded-xl px-3 py-2 text-xs font-medium ${
            locale === "en" ? "bg-accent font-bold text-foreground" : ""
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-base">🇬🇧</span>
            <span>English</span>
          </span>
          {locale === "en" && <Check className="w-3.5 h-3.5 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderLanguageDropdown;
