'use client';

import { ExternalLink, Github } from 'lucide-react';

import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { TagList } from '@/components/shared/timeline';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

import type { ProjectItem } from './definition';

export { buildProjectYearRanges, filterProjectsByYear } from './yearHelpers';

export function renderProjectCards(items: ProjectItem[], emptyLabel: string) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}: 0</p>;
  }

  return items.map((project, index) => (
    <AnimateOnScroll key={project.id} animation="neo-pop" delay={index * 80}>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <CardTitle className="min-w-0 flex-1 text-balance text-xl">{project.title}</CardTitle>
            <span className="shrink-0 whitespace-nowrap rounded-base border-2 border-border bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
              {project.year}
            </span>
          </div>
          <CardDescription className="text-foreground/80 mt-2 text-sm leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TagList items={project.technologies ?? []} variant="secondary" />
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
  ));
}
