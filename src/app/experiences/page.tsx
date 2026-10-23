'use client';

import { ExperienceTimeline } from '@/components/shared/ExperienceTimeline';
import { getDictionary } from '@/i18n';
import { useLocaleStore } from '@/stores/localeStore';

export default function ExperiencesPage() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const e = dict.experiences;

  return (
    <ExperienceTimeline
      title={e.title}
      subtitle={e.subtitle}
      menuLabel={e.menuLabel}
      allLabel={e.allLabel}
      yearRanges={e.yearRanges}
      items={e.items}
    />
  );
}
