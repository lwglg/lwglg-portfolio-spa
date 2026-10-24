'use client';

import { type ProjectItem, ProjectTimeline } from '@/components/shared/ProjectTimeline';
import type { YearRange } from '@/components/shared/timeline';
import { getDictionary } from '@/i18n';
import { useLocaleStore } from '@/stores/localeStore';

export default function ProjectsPage() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const p = dict.projects;

  const yearRanges = (p.yearRanges ?? []) as YearRange[];
  const items = p.items as ProjectItem[];

  return (
    <ProjectTimeline
      title={p.title}
      subtitle={p.subtitle}
      menuLabel={p.menuLabel}
      allLabel={p.allLabel}
      yearRanges={yearRanges}
      items={items}
    />
  );
}
