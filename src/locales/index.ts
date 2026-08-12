import { vi } from './vi';
import { en } from './en';
import { TranslationDictionary, Locale } from '../types/i18n';

export const dictionaries: Record<Locale, TranslationDictionary> = {
  vi,
  en,
};
