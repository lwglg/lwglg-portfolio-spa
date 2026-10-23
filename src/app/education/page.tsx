'use client';

import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { EducationTimeline } from '@/components/shared/EducationTimeline';

export default function EducationPage() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const e = dict.education;

  return (
    <EducationTimeline
      title={e.title}
      subtitle={e.subtitle}
      menuLabel={e.menuLabel}
      academicLabel={e.academicLabel}
      coursesLabel={e.coursesLabel}
      periodLabel={e.periodLabel}
      allLabel={e.allLabel}
      credentialLabel={e.credentialLabel}
      academic={e.academic}
      courses={e.courses}
    />
  );
}
