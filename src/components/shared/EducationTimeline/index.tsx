'use client';

import { TimelinePageHeader, TimelineSideMenu } from '@/components/shared/timeline';

import type { EducationTimelineProps } from './definition';
import { renderEducationCards, renderSectionSwitcher } from './helpers';
import { useEducationTimeline } from './hooks';

export type {
  EducationItem,
  EducationSection,
  EducationTimelineProps,
  YearRange,
} from './definition';

export function EducationTimeline({
  title,
  subtitle,
  menuLabel,
  academicLabel,
  coursesLabel,
  periodLabel: _periodLabel,
  allLabel,
  credentialLabel,
  academic,
  courses,
}: EducationTimelineProps) {
  const { section, setSection, activeData, ranges, activeRange, setActiveRange, filtered } =
    useEducationTimeline(academic, courses);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <TimelinePageHeader title={title} subtitle={subtitle} />

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <TimelineSideMenu
          menuLabel={menuLabel}
          allLabel={allLabel}
          ranges={ranges}
          items={activeData.items}
          activeRange={activeRange}
          onSelectRange={setActiveRange}
          sectionSwitcher={renderSectionSwitcher({
            section,
            onSectionChange: setSection,
            academicLabel,
            coursesLabel,
          })}
        />

        <div className="min-w-0 flex-1 space-y-6">
          {renderEducationCards(filtered, credentialLabel)}
        </div>
      </div>
    </div>
  );
}
