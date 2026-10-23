'use client';

import { TimelinePageHeader, TimelineSideMenu } from '@/components/shared/timeline';

import type { ExperienceTimelineProps } from './definition';
import { renderExperienceCards } from './helpers';
import { useExperienceTimeline } from './hooks';

export type { ExperienceItem, ExperienceTimelineProps, YearRange } from './definition';

export function ExperienceTimeline({
  title,
  subtitle,
  menuLabel,
  allLabel,
  yearRanges,
  items,
}: ExperienceTimelineProps) {
  const { ranges, activeRange, setActiveRange, filtered } = useExperienceTimeline(
    yearRanges,
    items,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <TimelinePageHeader title={title} subtitle={subtitle} />

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <TimelineSideMenu
          menuLabel={menuLabel}
          allLabel={allLabel}
          ranges={ranges}
          items={items}
          activeRange={activeRange}
          onSelectRange={setActiveRange}
        />

        <div className="min-w-0 flex-1 space-y-6">{renderExperienceCards(filtered)}</div>
      </div>
    </div>
  );
}
