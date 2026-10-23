'use client';

import { localeMeta } from '@/i18n/localeMeta';
import { cn } from '@/lib/utils';
import { useLocaleStore } from '@/stores/localeStore';
import type { Locale } from '@/types';

/**
 * Native select: flag appears only once — inside the option label.
 * Avoid a separate absolute flag overlay (that caused double flags after selection).
 */
export function LanguageSelect({ className }: { className?: string }) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label="Language / Idioma"
        className={cn(
          'h-10 cursor-pointer appearance-none rounded-base border-2 border-border bg-background',
          'pl-3 pr-8 text-sm font-bold text-foreground shadow-neo-sm',
          'transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        )}
      >
        {localeMeta.map((meta) => (
          <option key={meta.code} value={meta.code}>
            {meta.flag} {meta.shortLabel}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-2 text-xs text-muted-foreground"
        aria-hidden
      >
        ▾
      </span>
    </div>
  );
}
