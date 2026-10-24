import type { YearRange } from '@/components/shared/timeline';
import { buildDynamicYearRanges, filterByYearRange } from '@/components/shared/timeline';

import type { ProjectItem } from './definition';

function withYears(items: ProjectItem[]): ProjectItem[] {
  return items.map((item) => {
    const y = (item.startYear ?? Number.parseInt(item.year, 10)) || 0;
    return {
      ...item,
      startYear: y,
      endYear: item.endYear ?? y,
    };
  });
}

/**
 * Build menu year ranges from configured ranges + items (same algorithm as experiences).
 * Exported for unit tests.
 */
export function buildProjectYearRanges(yearRanges: YearRange[], items: ProjectItem[]): YearRange[] {
  return buildDynamicYearRanges(yearRanges, withYears(items));
}

/** Filter projects by active range id (`all` = no filter). Exported for unit tests. */
export function filterProjectsByYear(items: ProjectItem[], activeRange: string): ProjectItem[] {
  return filterByYearRange(withYears(items), activeRange);
}
