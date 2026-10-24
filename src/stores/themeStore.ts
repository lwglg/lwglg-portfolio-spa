/**
 * Flux-style store for theme (light / dark / system).
 */
import { create } from 'zustand';

import { DEFAULT_THEME, STORAGE_KEYS, THEMES } from '@/constants';
import type { Theme } from '@/types';

interface ThemeState {
  theme: Theme;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: DEFAULT_THEME,

  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    }
    set({ theme });
  },

  cycleTheme: () => {
    const current = get().theme;
    const idx = THEMES.indexOf(current);
    const next = THEMES[(idx + 1) % THEMES.length];
    get().setTheme(next);
  },
}));

export function hydrateThemeStore() {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(STORAGE_KEYS.theme) as Theme | null;

  if (stored && (THEMES as readonly string[]).includes(stored)) {
    useThemeStore.getState().setTheme(stored);
  }
}
