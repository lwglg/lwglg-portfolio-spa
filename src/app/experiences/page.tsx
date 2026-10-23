'use client';

import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { ExperienceTimeline } from '@/components/shared/ExperienceTimeline';

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
