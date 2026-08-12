export type Locale = 'vi' | 'en';

export type TranslationDictionary = {
  [key: string]: string | TranslationDictionary;
};

export type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};
