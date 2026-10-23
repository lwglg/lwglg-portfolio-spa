'use client';

import { type ProjectItem, ProjectTimeline } from '@/components/shared/ProjectTimeline';
import { getDictionary } from '@/i18n';
import { useLocaleStore } from '@/stores/localeStore';

export default function ProjectsPage() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const p = dict.projects;

  const items = p.items as ProjectItem[];

  return (
    <ProjectTimeline
      title={p.title}
      subtitle={p.subtitle}
      menuLabel={p.menuLabel}
      allLabel={p.allLabel}
      yearRanges={p.yearRanges}
      items={items}
    />
  );
}
