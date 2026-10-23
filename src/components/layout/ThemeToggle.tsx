'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { cn } from '@/lib/utils';
import type { Theme } from '@/types';

const options: { value: Theme; Icon: typeof Sun }[] = [
  { value: 'light', Icon: Sun },
  { value: 'dark', Icon: Moon },
  { value: 'system', Icon: Monitor },
];

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);

  return (
    <div
      role="group"
      aria-label={dict.theme.system}
      className={cn(
        'inline-flex items-center rounded-base border-2 border-border bg-background p-0.5 shadow-neo-sm',
        className,
      )}
    >
      {options.map(({ value, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={dict.theme[value]}
            aria-pressed={active}
            title={dict.theme[value]}
            className={cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-[calc(0.5rem-2px)] transition-all',
              active
                ? 'bg-primary text-primary-foreground shadow-neo-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
