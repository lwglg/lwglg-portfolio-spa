'use client';

import type { YearRange } from '@/components/shared/timeline';
import { useTimelineRange } from '@/components/shared/timeline';

import type { ProjectItem } from './definition';

/** Normalise items so shared range helpers can sort by startYear. */
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

export function useProjectTimeline(yearRanges: YearRange[], items: ProjectItem[]) {
  const normalised = withYears(items);
  return useTimelineRange(yearRanges, normalised);
}
