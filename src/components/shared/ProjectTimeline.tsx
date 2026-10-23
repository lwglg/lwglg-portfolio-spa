'use client';

import { useMemo, useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { cn } from '@/lib/utils';

export interface YearRange {
  id: string;
  label: string;
  startYear?: number;
  endYear?: number;
}

export interface ProjectItem {
  id: string;
  yearRangeId: string;
  year: string;
  title: string;
  description: string;
  repoUrl?: string | null;
  articleUrl?: string | null;
  technologies?: string[];
}

export interface ProjectYearRange {
  id: string;
  label: string;
  year: number;
}

/** Build unique year ranges from projects, newest first. Exported for unit tests. */
export function buildProjectYearRanges(items: ProjectItem[]): ProjectYearRange[] {
  const byId = new Map<string, ProjectYearRange>();
  for (const item of items) {
    if (byId.has(item.yearRangeId)) continue;
    const year = Number.parseInt(item.year, 10) || 0;
    byId.set(item.yearRangeId, {
      id: item.yearRangeId,
      label: item.year,
      year,
    });
  }
  return [...byId.values()].sort((a, b) => b.year - a.year);
}

/** Filter projects by active range id (`all` = no filter). Exported for unit tests. */
export function filterProjectsByYear(items: ProjectItem[], activeRange: string): ProjectItem[] {
  const list =
    activeRange === 'all' ? items : items.filter((item) => item.yearRangeId === activeRange);
  return [...list].sort((a, b) => {
    const ya = Number.parseInt(a.year, 10) || 0;
    const yb = Number.parseInt(b.year, 10) || 0;
    return yb - ya;
  });
}

interface ProjectTimelineProps {
  title: string;
  subtitle: string;
  menuLabel: string;
  allLabel: string;
  yearRanges: YearRange[];
  items: ProjectItem[];
}

export function ProjectTimeline({
  title,
  subtitle,
  menuLabel,
  allLabel,
  items,
}: ProjectTimelineProps) {
  const ranges = useMemo(() => buildProjectYearRanges(items), [items]);
  const [activeRange, setActiveRange] = useState<string>('all');

  useEffect(() => {
    if (activeRange !== 'all' && !ranges.some((r) => r.id === activeRange)) {
      setActiveRange('all');
    }
  }, [ranges, activeRange]);

  const filtered = useMemo(() => filterProjectsByYear(items, activeRange), [items, activeRange]);

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
          {filtered.map((project, index) => (
            <AnimateOnScroll key={project.id} animation="neo-pop" delay={index * 80}>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <CardTitle className="min-w-0 flex-1 text-balance text-xl">
                      {project.title}
                    </CardTitle>
                    <span className="shrink-0 whitespace-nowrap rounded-base border-2 border-border bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                      {project.year}
                    </span>
                  </div>
                  <CardDescription className="text-foreground/80 mt-2 text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-base border-2 border-border bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {project.articleUrl ? (
                      <a href={project.articleUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="sm">
                          <ExternalLink className="h-4 w-4" />
                          Medium
                        </Button>
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Github className="h-4 w-4" />
                          GitHub
                        </Button>
                      </a>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}

          {filtered.length === 0 && <p className="text-sm text-muted-foreground">{allLabel}: 0</p>}
        </div>
      </div>
    </div>
  );
}
