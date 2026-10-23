'use client';

import { ExternalLink, Github } from 'lucide-react';
import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

export default function ProjectsPage() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const p = dict.projects;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <AnimateOnScroll animation="fade-up">
        <header>
          <h1 className="font-head text-3xl font-bold tracking-tight sm:text-4xl">{p.title}</h1>
        </header>
      </AnimateOnScroll>

      <div className="space-y-6">
        {p.items.map((project, index) => (
          <AnimateOnScroll key={project.id} animation="neo-pop" delay={index * 100}>
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <span className="rounded-base border-2 border-border bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                    {project.year}
                  </span>
                </div>
                <CardDescription className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {project.articleUrl && (
                  <a href={project.articleUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="sm">
                      <ExternalLink className="h-4 w-4" />
                      Medium
                    </Button>
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
