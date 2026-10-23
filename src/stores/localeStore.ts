/**
 * Flux-style store for locale (i18n).
 * Actions → Store (Zustand) → Components subscribe via selectors.
 */
import { create } from 'zustand';

import { STORAGE_KEYS, SUPPORTED_LOCALES } from '@/constants';
import { defaultLocale, isValidLocale } from '@/i18n';
import type { Locale } from '@/types';

interface LocaleState {
  locale: Locale;
}

interface LocaleActions {
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

type LocaleStore = LocaleState & LocaleActions;

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale;
  const stored = localStorage.getItem(STORAGE_KEYS.locale);
  if (stored && isValidLocale(stored)) return stored;
  return defaultLocale;
};

export const useLocaleStore = create<LocaleStore>((set, get) => ({
  locale: defaultLocale,

  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.locale, locale);
    }
    set({ locale });
  },

  toggleLocale: () => {
    const current = get().locale;
    const idx = SUPPORTED_LOCALES.indexOf(current);
    const next = SUPPORTED_LOCALES[(idx + 1) % SUPPORTED_LOCALES.length];
    get().setLocale(next);
  },
}));

/** Hydrate from localStorage after mount (client-only). */
export function hydrateLocaleStore() {
  const locale = getInitialLocale();
  useLocaleStore.getState().setLocale(locale);
}
