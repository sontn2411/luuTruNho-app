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
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary-light)] transition-all duration-300 font-medium text-sm"
      aria-label="Toggle language"
    >
      <span className="text-lg leading-none">{locale === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
      <span>{locale === 'vi' ? 'VN' : 'EN'}</span>
    </button>
  );
};
