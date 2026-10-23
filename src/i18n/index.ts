import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/constants';
import type { Locale } from '@/types';

import enGB from './locales/en-GB.json';
import ptBR from './locales/pt-BR.json';

const dictionaries = {
  'pt-BR': ptBR,
  'en-GB': enGB,
} as const;

export type Dictionary = typeof ptBR;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export const defaultLocale: Locale = DEFAULT_LOCALE;
export const locales: Locale[] = [...SUPPORTED_LOCALES];

export function isValidLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
