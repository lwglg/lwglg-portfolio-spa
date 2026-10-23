'use client';

import { useEffect, useMemo, useState } from 'react';

import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { assetPath } from '@/lib/asset';
import { cn } from '@/lib/utils';

export interface YearRange {
  id: string;
  label: string;
  startYear?: number;
  endYear?: number;
}

export interface ExperienceItem {
  id: string;
  yearRangeId: string;
  startYear?: number;
  endYear?: number;
  company: string;
  role: string;
  period: string;
  location: string;
  logoInitials?: string;
  logoColor?: string;
  logoSrc?: string;
  description: string[];
  technologies: string[];
}

interface ExperienceTimelineProps {
  title: string;
  subtitle: string;
  menuLabel: string;
  allLabel: string;
  yearRanges: YearRange[];
  items: ExperienceItem[];
}

function CompanyLogo({
  initials,
  color,
  company,
  logoSrc,
}: {
  initials?: string;
  color?: string;
  company: string;
  logoSrc?: string;
}) {
  if (logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={assetPath(logoSrc)}
        alt={company}
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 rounded-base border-2 border-border bg-white object-contain p-0.5 shadow-neo-sm"
      />
    );
  }

  const letters =
    initials ??
    company
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

  const isLight = color === '#ffdb33';

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-base border-2 border-border font-head text-sm font-bold shadow-neo-sm"
      style={{
        backgroundColor: color ?? 'var(--primary)',
        color: isLight ? '#000' : '#fff',
      }}
      aria-hidden
      title={company}
    >
      {letters}
    </div>
  );
}

/**
 * Builds side-menu entries dynamically from experiences' yearRangeIds,
 * ordered by start year (descending). Only ranges with at least one item appear.
 */
function useDynamicRanges(yearRanges: YearRange[], items: ExperienceItem[]): YearRange[] {
  return useMemo(() => {
    const usedIds = new Set(items.map((i) => i.yearRangeId));
    const fromConfig = yearRanges.filter((r) => usedIds.has(r.id));

    const configIds = new Set(fromConfig.map((r) => r.id));
    const missing: YearRange[] = [];
    for (const item of items) {
      if (configIds.has(item.yearRangeId)) continue;
      if (missing.some((m) => m.id === item.yearRangeId)) continue;
      const start = item.startYear ?? 0;
      const end = item.endYear ?? start;
      const label = end >= 9999 ? `${start} — …` : start === end ? `${start}` : `${start} — ${end}`;
      missing.push({
        id: item.yearRangeId,
        label,
        startYear: start,
        endYear: end,
      });
    }

    return [...fromConfig, ...missing].sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0));
  }, [yearRanges, items]);
}

export function ExperienceTimeline({
  title,
  subtitle,
  menuLabel,
  allLabel,
  yearRanges,
  items,
}: ExperienceTimelineProps) {
  const ranges = useDynamicRanges(yearRanges, items);
  const [activeRange, setActiveRange] = useState<string>('all');

  useEffect(() => {
    if (activeRange !== 'all' && !ranges.some((r) => r.id === activeRange)) {
      setActiveRange('all');
    }
  }, [ranges, activeRange]);

  const filtered = useMemo(() => {
    const list =
      activeRange === 'all' ? items : items.filter((item) => item.yearRangeId === activeRange);
    return [...list].sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0));
  }, [activeRange, items]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <AnimateOnScroll animation="fade-up">
        <header>
          <h1 className="font-head text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </header>
      </AnimateOnScroll>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <aside className="w-full shrink-0 md:sticky md:top-24 md:w-56">
          <AnimateOnScroll animation="fade-right">
            <nav
              aria-label={menuLabel}
              className="rounded-base border-2 border-border bg-card p-3 shadow-neo"
            >
              <p className="mb-2 px-2 font-head text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {menuLabel}
              </p>
              <ul className="flex flex-row flex-wrap gap-2 md:flex-col md:flex-nowrap">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveRange('all')}
                    className={cn(
                      'w-full rounded-base border-2 px-3 py-2 text-left text-sm font-bold transition-all',
                      activeRange === 'all'
                        ? 'border-border bg-primary text-primary-foreground shadow-neo-sm'
                        : 'border-transparent hover:border-border hover:bg-muted',
                    )}
                  >
                    {allLabel}
                  </button>
                </li>
                {ranges.map((range) => {
                  const count = items.filter((i) => i.yearRangeId === range.id).length;
                  return (
                    <li key={range.id}>
                      <button
                        type="button"
                        onClick={() => setActiveRange(range.id)}
                        className={cn(
                          'flex w-full items-center justify-between gap-2 rounded-base border-2 px-3 py-2 text-left text-sm font-bold transition-all',
                          activeRange === range.id
                            ? 'border-border bg-primary text-primary-foreground shadow-neo-sm'
                            : 'border-transparent hover:border-border hover:bg-muted',
                        )}
                      >
                        <span>{range.label}</span>
                        <span
                          className={cn(
                            'rounded-base border border-border px-1.5 text-xs',
                            activeRange === range.id ? 'bg-background/30' : 'bg-muted',
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </AnimateOnScroll>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">—</p>
          ) : (
            filtered.map((item, index) => (
              <AnimateOnScroll key={item.id} animation="neo-pop" delay={index * 60}>
                <Card>
                  <CardHeader>
                    <div className="flex flex-wrap items-start gap-4">
                      <CompanyLogo
                        initials={item.logoInitials}
                        color={item.logoColor}
                        company={item.company}
                        logoSrc={item.logoSrc}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-balance text-lg leading-snug sm:text-xl">
                              {item.role}
                            </CardTitle>
                            <CardDescription className="mt-1 font-medium text-foreground">
                              {item.company}
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
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-base border-2 border-border bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
