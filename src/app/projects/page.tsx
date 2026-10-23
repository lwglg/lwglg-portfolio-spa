'use client';

import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { ProjectTimeline, type ProjectItem } from '@/components/shared/ProjectTimeline';

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
