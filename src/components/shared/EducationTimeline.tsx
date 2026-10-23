'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { cn } from '@/lib/utils';
import { assetPath } from '@/lib/asset';

export interface YearRange {
  id: string;
  label: string;
  startYear?: number;
  endYear?: number;
}

export interface EducationItem {
  id: string;
  yearRangeId: string;
  startYear?: number;
  endYear?: number;
  institution: string;
  degree: string;
  period: string;
  location: string;
  logoSrc?: string;
  description: string[];
  topics: string[];
  credentialUrl?: string | null;
}

interface EducationSection {
  yearRanges: YearRange[];
  items: EducationItem[];
}

interface EducationTimelineProps {
  title: string;
  subtitle: string;
  menuLabel: string;
  academicLabel: string;
  coursesLabel: string;
  periodLabel: string;
  allLabel: string;
  credentialLabel: string;
  academic: EducationSection;
  courses: EducationSection;
}

type SectionKey = 'academic' | 'courses';

function InstitutionLogo({ logoSrc, name }: { logoSrc?: string; name: string }) {
  if (logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={assetPath(logoSrc)}
        alt={name}
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 rounded-base border-2 border-border bg-white object-contain p-0.5 shadow-neo-sm"
      />
    );
  }
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-base border-2 border-border bg-primary font-head text-xs font-bold shadow-neo-sm">
      {letters}
    </div>
  );
}

function useDynamicRanges(yearRanges: YearRange[], items: EducationItem[]): YearRange[] {
  return useMemo(() => {
    const used = new Set(items.map((i) => i.yearRangeId));
    return yearRanges
      .filter((r) => used.has(r.id))
      .sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0));
  }, [yearRanges, items]);
}

export function EducationTimeline({
  title,
  subtitle,
  menuLabel,
  academicLabel,
  coursesLabel,
  periodLabel,
  allLabel,
  credentialLabel,
  academic,
  courses,
}: EducationTimelineProps) {
  const [section, setSection] = useState<SectionKey>('academic');
  const activeData = section === 'academic' ? academic : courses;
  const ranges = useDynamicRanges(activeData.yearRanges, activeData.items);
  const [activeRange, setActiveRange] = useState<string>('all');

  useEffect(() => {
    setActiveRange('all');
  }, [section]);

  useEffect(() => {
    if (activeRange !== 'all' && !ranges.some((r) => r.id === activeRange)) {
      setActiveRange('all');
    }
  }, [ranges, activeRange]);

  const filtered = useMemo(() => {
    const list =
      activeRange === 'all'
        ? activeData.items
        : activeData.items.filter((i) => i.yearRangeId === activeRange);
    return [...list].sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0));
  }, [activeRange, activeData.items]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <AnimateOnScroll animation="fade-up">
        <header>
          <h1 className="font-head text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </header>
      </AnimateOnScroll>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <aside className="w-full shrink-0 md:sticky md:top-24 md:w-60">
          <AnimateOnScroll animation="fade-right">
            <nav
              aria-label={menuLabel}
              className="space-y-4 rounded-base border-2 border-border bg-card p-3 shadow-neo"
            >
              {/* Section switcher */}
              <div>
                <p className="mb-2 px-2 font-head text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {menuLabel}
                </p>
                <ul className="flex flex-col gap-2">
                  {(
                    [
                      ['academic', academicLabel],
                      ['courses', coursesLabel],
                    ] as const
                  ).map(([key, label]) => (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setSection(key)}
                        className={cn(
                          'w-full rounded-base border-2 px-3 py-2 text-left text-sm font-bold transition-all',
                          section === key
                            ? 'border-border bg-primary text-primary-foreground shadow-neo-sm'
                            : 'border-transparent hover:border-border hover:bg-muted',
                        )}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Temporal submenu */}
              <div>
                <p className="mb-2 px-2 font-head text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {periodLabel}
                </p>
                <ul className="flex flex-row flex-wrap gap-2 md:flex-col md:flex-nowrap">
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveRange('all')}
                      className={cn(
                        'w-full rounded-base border-2 px-3 py-2 text-left text-sm font-bold transition-all',
                        activeRange === 'all'
                          ? 'border-border bg-secondary text-secondary-foreground shadow-neo-sm'
                          : 'border-transparent hover:border-border hover:bg-muted',
                      )}
                    >
                      {allLabel}
                    </button>
                  </li>
                  {ranges.map((range) => {
                    const count = activeData.items.filter((i) => i.yearRangeId === range.id).length;
                    return (
                      <li key={range.id}>
                        <button
                          type="button"
                          onClick={() => setActiveRange(range.id)}
                          className={cn(
                            'flex w-full items-center justify-between gap-2 rounded-base border-2 px-3 py-2 text-left text-sm font-bold transition-all',
                            activeRange === range.id
                              ? 'border-border bg-secondary text-secondary-foreground shadow-neo-sm'
                              : 'border-transparent hover:border-border hover:bg-muted',
                          )}
                        >
                          <span>{range.label}</span>
                          <span className="rounded-base border border-border bg-muted px-1.5 text-xs">
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </AnimateOnScroll>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          {filtered.map((item, index) => (
            <AnimateOnScroll key={item.id} animation="neo-pop" delay={index * 60}>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start gap-4">
                    <InstitutionLogo logoSrc={item.logoSrc} name={item.institution} />
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
                  {item.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-base border-2 border-border bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
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
          ))}
        </div>
      </div>
    </div>
  );
}
