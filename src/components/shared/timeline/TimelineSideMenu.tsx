'use client';

import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { cn } from '@/lib/utils';

import { countByYearRangeId, type HasYearRange } from './helpers';
import type { YearRange } from './types';
import { ACTIVE_RANGE_ALL } from './types';

export interface TimelineSideMenuProps<T extends HasYearRange> {
  menuLabel: string;
  allLabel: string;
  ranges: YearRange[];
  items: T[];
  activeRange: string;
  onSelectRange: (id: string) => void;
  /** Optional section switcher rendered above the year list (education). */
  sectionSwitcher?: React.ReactNode;
}

export function TimelineSideMenu<T extends HasYearRange>({
  menuLabel,
  allLabel,
  ranges,
  items,
  activeRange,
  onSelectRange,
  sectionSwitcher,
}: TimelineSideMenuProps<T>) {
  return (
    <aside className="w-full shrink-0 md:sticky md:top-24 md:w-56">
      <AnimateOnScroll animation="fade-right">
        <nav
          aria-label={menuLabel}
          className="rounded-base border-2 border-border bg-card p-3 shadow-neo"
        >
          {sectionSwitcher}

          <p className="mb-2 px-2 font-head text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {menuLabel}
          </p>
          <ul className="flex flex-row flex-wrap gap-2 md:flex-col md:flex-nowrap">
            <li>
              <button
                type="button"
                onClick={() => onSelectRange(ACTIVE_RANGE_ALL)}
                className={cn(
                  'w-full rounded-base border-2 px-3 py-2 text-left text-sm font-bold transition-all',
                  activeRange === ACTIVE_RANGE_ALL
                    ? 'border-border bg-primary text-primary-foreground shadow-neo-sm'
                    : 'border-transparent hover:border-border hover:bg-muted',
                )}
              >
                {allLabel}
              </button>
            </li>
            {ranges.map((range) => {
              const count = countByYearRangeId(items, range.id);
              return (
                <li key={range.id}>
                  <button
                    type="button"
                    onClick={() => onSelectRange(range.id)}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 rounded-base border-2 px-3 py-2 text-left text-sm font-bold transition-all',
                      activeRange === range.id
                        ? 'border-border bg-primary text-primary-foreground shadow-neo-sm'
                        : 'border-transparent hover:border-border hover:bg-muted',
                    )}
                  >
                    <span>{range.label}</span>
                    <span
                      className={cn(
                        'rounded-base border border-border px-1.5 text-xs',
                        activeRange === range.id ? 'bg-background/30' : 'bg-muted',
                      )}
                    >
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </AnimateOnScroll>
    </aside>
  );
}
