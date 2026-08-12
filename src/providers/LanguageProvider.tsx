'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Locale, LanguageContextType } from '../types/i18n';
import { dictionaries } from '../locales';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi'); // Mặc định là Tiếng Việt
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Khôi phục ngôn ngữ từ localStorage khi load trang
    const storedLocale = localStorage.getItem('stayflow_locale') as Locale;
    if (storedLocale && (storedLocale === 'vi' || storedLocale === 'en')) {
      setLocaleState(storedLocale);
      document.documentElement.lang = storedLocale;
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('stayflow_locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    const keys = keyPath.split('.');
    let value: any = dictionaries[locale];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return keyPath; // Trả về key nếu không tìm thấy bản dịch
      }
    }

    if (typeof value !== 'string') {
      return keyPath;
    }

    let translatedString = value;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translatedString = translatedString.replace(
          new RegExp(`{${paramKey}}`, 'g'),
          String(paramValue)
        );
      });
    }

    return translatedString;
  };

  // Tránh flash nội dung ngôn ngữ sai khi render lần đầu (hydration mismatch)
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
