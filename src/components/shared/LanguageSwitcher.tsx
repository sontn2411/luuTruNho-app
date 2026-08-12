'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useTranslation();

  const toggleLanguage = () => {
    setLocale(locale === 'vi' ? 'en' : 'vi');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex items-center justify-center w-12 h-12 rounded-xl text-primary-foreground/80 hover:bg-primary-foreground/15 hover:text-primary-foreground transition-all duration-200"
      aria-label="Toggle language"
    >
      <span className="text-lg leading-none">{locale === 'vi' ? '🇻🇳' : '🇬🇧'}</span>

      {/* Tooltip */}
      <span className="absolute left-full ml-3.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-sm font-medium whitespace-nowrap opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 shadow-lg z-50">
        {locale === 'vi' ? 'Tiếng Việt (VN)' : 'English (EN)'}
      </span>
    </button>
  );
};
