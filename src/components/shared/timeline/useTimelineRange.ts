'use client';

import { useEffect, useMemo, useState } from 'react';

import { buildDynamicYearRanges, filterByYearRange, type HasYearRange } from './helpers';
import type { YearRange } from './types';
import { ACTIVE_RANGE_ALL, type ActiveRangeId } from './types';

/**
 * Shared range-selection state for side-menu timelines.
 * Resets to "all" when the available ranges change invalidates the selection.
 */
export function useTimelineRange<T extends HasYearRange>(
  yearRanges: YearRange[],
  items: T[],
  /** When this key changes, selection resets to "all" (e.g. education section). */
  resetKey?: string | number,
) {
  const ranges = useMemo(() => buildDynamicYearRanges(yearRanges, items), [yearRanges, items]);

  const [activeRange, setActiveRange] = useState<ActiveRangeId>(ACTIVE_RANGE_ALL);

  useEffect(() => {
    if (resetKey === undefined) return;
    setActiveRange(ACTIVE_RANGE_ALL);
  }, [resetKey]);

  useEffect(() => {
    if (activeRange !== ACTIVE_RANGE_ALL && !ranges.some((r) => r.id === activeRange)) {
      setActiveRange(ACTIVE_RANGE_ALL);
    }
  }, [ranges, activeRange]);

  const filtered = useMemo(() => filterByYearRange(items, activeRange), [items, activeRange]);

  return { ranges, activeRange, setActiveRange, filtered };
}
