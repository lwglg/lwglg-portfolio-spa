import type { YearRange } from './types';

export interface HasYearRange {
  yearRangeId: string;
  startYear?: number;
  endYear?: number;
}

/** Label for a numeric year span (open-ended when end >= 9999). */
export function formatYearSpan(start: number, end: number): string {
  if (end >= 9999) return `${start} — …`;
  if (start === end) return `${start}`;
  return `${start} — ${end}`;
}

/**
 * Merge configured year ranges with any ids present only on items,
 * keep only ranges that have at least one item, sort newest-first.
 */
export function buildDynamicYearRanges<T extends HasYearRange>(
  yearRanges: YearRange[],
  items: T[],
): YearRange[] {
  const usedIds = new Set(items.map((i) => i.yearRangeId));
  const fromConfig = yearRanges.filter((r) => usedIds.has(r.id));
  const configIds = new Set(fromConfig.map((r) => r.id));

  const missing: YearRange[] = [];
  for (const item of items) {
    if (configIds.has(item.yearRangeId)) continue;
    if (missing.some((m) => m.id === item.yearRangeId)) continue;
    const start = item.startYear ?? 0;
    const end = item.endYear ?? start;
    missing.push({
      id: item.yearRangeId,
      label: formatYearSpan(start, end),
      startYear: start,
      endYear: end,
    });
  }

  return [...fromConfig, ...missing].sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0));
}

/** Filter by active range and sort by startYear descending. */
export function filterByYearRange<T extends HasYearRange>(items: T[], activeRange: string): T[] {
  const list =
    activeRange === 'all' ? items : items.filter((item) => item.yearRangeId === activeRange);
  return [...list].sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0));
}

/** Count items per year-range id. */
export function countByYearRangeId<T extends HasYearRange>(items: T[], rangeId: string): number {
  return items.filter((i) => i.yearRangeId === rangeId).length;
}
