'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LanguageSelect } from '@/components/layout/LanguageSelect';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { ASSET_PATHS, NAV_ITEMS } from '@/constants';
import { getDictionary } from '@/i18n';
import { assetPath } from '@/lib/asset';
import { cn } from '@/lib/utils';
import { useLocaleStore } from '@/stores/localeStore';

export function Header() {
  const pathname = usePathname();
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 border-b-2 border-border backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-base border-2 border-transparent hover:border-border"
          aria-label="Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath(ASSET_PATHS.logo)}
            alt="Guilherme L. Gonçalves Desenvolvimento de Sistemas Ltda."
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/' || pathname === ''
                : pathname.startsWith(item.href.replace(/\/$/, ''));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-base border-2 px-3 py-1.5 text-sm font-bold transition-all',
                  isActive
                    ? 'border-border bg-primary text-primary-foreground shadow-neo-sm'
                    : 'border-transparent hover:border-border hover:bg-muted',
                )}
              >
                {dict.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelect />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex flex-wrap gap-1 border-t-2 border-border px-4 py-2 sm:hidden">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/' || pathname === ''
              : pathname.startsWith(item.href.replace(/\/$/, ''));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-base border-2 px-2 py-1 text-xs font-bold',
                isActive
                  ? 'border-border bg-primary text-primary-foreground'
                  : 'border-transparent',
              )}
            >
              {dict.nav[item.key]}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
