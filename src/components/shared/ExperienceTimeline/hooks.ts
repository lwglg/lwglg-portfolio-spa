'use client';

import type { YearRange } from '@/components/shared/timeline';
import { useTimelineRange } from '@/components/shared/timeline';

import type { ExperienceItem } from './definition';

export function useExperienceTimeline(yearRanges: YearRange[], items: ExperienceItem[]) {
  return useTimelineRange(yearRanges, items);
}
