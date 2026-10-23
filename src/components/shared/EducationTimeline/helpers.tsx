'use client';

import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { EntityLogo, TagList } from '@/components/shared/timeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

import type { EducationItem, EducationSectionKey } from './definition';

export function renderSectionSwitcher({
  section,
  onSectionChange,
  academicLabel,
  coursesLabel,
}: {
  section: EducationSectionKey;
  onSectionChange: (key: EducationSectionKey) => void;
  academicLabel: string;
  coursesLabel: string;
}) {
  const btn = (key: EducationSectionKey, label: string) => (
    <button
      type="button"
      onClick={() => onSectionChange(key)}
      className={cn(
        'w-full rounded-base border-2 px-3 py-2 text-left text-sm font-bold transition-all',
        section === key
          ? 'border-border bg-secondary text-secondary-foreground shadow-neo-sm'
          : 'border-transparent hover:border-border hover:bg-muted',
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="mb-3 space-y-1 border-b-2 border-border pb-3">
      {btn('academic', academicLabel)}
      {btn('courses', coursesLabel)}
    </div>
  );
}

export function renderEducationCards(items: EducationItem[], credentialLabel: string) {
  return items.map((item, index) => (
    <AnimateOnScroll key={item.id} animation="neo-pop" delay={index * 60}>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start gap-4">
            <EntityLogo name={item.institution} logoSrc={item.logoSrc} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-balance text-lg leading-snug sm:text-xl">
                    {item.degree}
                  </CardTitle>
                  <CardDescription className="mt-1 font-medium text-foreground">
                    {item.institution}
                  </CardDescription>
                </div>
                <div className="shrink-0 whitespace-nowrap text-right text-sm text-muted-foreground">
                  <p className="font-bold">{item.period}</p>
                  <p>{item.location}</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed">
            {item.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <TagList items={item.topics} variant="accent" />
          {item.credentialUrl ? (
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-base border-2 border-border bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-neo-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            >
              {credentialLabel}
            </a>
          ) : null}
        </CardContent>
      </Card>
    </AnimateOnScroll>
  ));
}
