'use client';

import { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { hydrateLocaleStore } from '@/stores/localeStore';
import { hydrateThemeStore, useThemeStore } from '@/stores/themeStore';

function ThemeSync() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    hydrateThemeStore();
    hydrateLocaleStore();
  }, []);

  // next-themes handles the class on <html>; we keep our store in sync
  useEffect(() => {
    // Store is the source of truth for cycleTheme; next-themes applies it
  }, [theme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      forcedTheme={theme === 'system' ? undefined : theme}
      disableTransitionOnChange
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}
