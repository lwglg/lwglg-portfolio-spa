'use client';

import { useEffect, useMemo, useState } from 'react';

import { ACTIVE_RANGE_ALL, type ActiveRangeId } from '@/components/shared/timeline';

import type { ProjectItem } from './definition';
import { buildProjectYearRanges, filterProjectsByYear } from './yearHelpers';

export function useProjectTimeline(items: ProjectItem[]) {
  const ranges = useMemo(() => buildProjectYearRanges(items), [items]);
  const [activeRange, setActiveRange] = useState<ActiveRangeId>(ACTIVE_RANGE_ALL);

  useEffect(() => {
    if (activeRange !== ACTIVE_RANGE_ALL && !ranges.some((r) => r.id === activeRange)) {
      setActiveRange(ACTIVE_RANGE_ALL);
    }
  }, [ranges, activeRange]);

  const filtered = useMemo(() => filterProjectsByYear(items, activeRange), [items, activeRange]);

  const yearRanges = useMemo(
    () =>
      ranges.map((r) => ({
        id: r.id,
        label: r.label,
        startYear: r.year,
        endYear: r.year,
      })),
    [ranges],
  );

  return { yearRanges, activeRange, setActiveRange, filtered, itemsForMenu: items };
}
