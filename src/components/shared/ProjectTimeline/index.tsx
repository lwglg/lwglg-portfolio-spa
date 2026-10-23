'use client';

import { TimelinePageHeader, TimelineSideMenu } from '@/components/shared/timeline';

import type { ProjectTimelineProps } from './definition';
import { renderProjectCards } from './helpers';
import { useProjectTimeline } from './hooks';

export type { ProjectItem, ProjectTimelineProps, ProjectYearRange } from './definition';
export { buildProjectYearRanges, filterProjectsByYear } from './yearHelpers';

export function ProjectTimeline({
  title,
  subtitle,
  menuLabel,
  allLabel,
  items,
}: ProjectTimelineProps) {
  const { yearRanges, activeRange, setActiveRange, filtered, itemsForMenu } =
    useProjectTimeline(items);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <TimelinePageHeader title={title} subtitle={subtitle} />

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <TimelineSideMenu
          menuLabel={menuLabel}
          allLabel={allLabel}
          ranges={yearRanges}
          items={itemsForMenu}
          activeRange={activeRange}
          onSelectRange={setActiveRange}
        />

        <div className="min-w-0 flex-1 space-y-6">{renderProjectCards(filtered, allLabel)}</div>
      </div>
    </div>
  );
}
