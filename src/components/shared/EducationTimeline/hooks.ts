'use client';

import { useState } from 'react';

import { useTimelineRange } from '@/components/shared/timeline';

import type { EducationItem, EducationSection, EducationSectionKey } from './definition';

export function useEducationTimeline(academic: EducationSection, courses: EducationSection) {
  const [section, setSection] = useState<EducationSectionKey>('academic');
  const activeData = section === 'academic' ? academic : courses;

  const rangeState = useTimelineRange(
    activeData.yearRanges,
    activeData.items as EducationItem[],
    section,
  );

  return {
    section,
    setSection,
    activeData,
    ...rangeState,
  };
}
