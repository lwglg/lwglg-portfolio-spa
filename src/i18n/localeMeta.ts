import type { Locale } from '@/types';

export interface LocaleMeta {
  code: Locale;
  /** Short label shown in the select, e.g. PT-BR */
  shortLabel: string;
  /** Full name for accessibility */
  label: string;
  /** Unicode flag emoji */
  flag: string;
}

/**
 * Registry of supported locales.
 * Add new languages here (and matching JSON under locales/) to extend the select.
 */
export const localeMeta: LocaleMeta[] = [
  {
    code: 'pt-BR',
    shortLabel: 'PT-BR',
    label: 'Português (Brasil)',
    flag: '🇧🇷',
  },
  {
    code: 'en-GB',
    shortLabel: 'EN-GB',
    label: 'English (UK)',
    flag: '🇬🇧',
  },
];

export function getLocaleMeta(code: Locale): LocaleMeta {
  return localeMeta.find((m) => m.code === code) ?? localeMeta[0];
}
