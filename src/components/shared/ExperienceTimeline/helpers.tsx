'use client';

import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { EntityLogo, TagList } from '@/components/shared/timeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

import type { ExperienceItem } from './definition';

export function renderExperienceCards(items: ExperienceItem[]) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">—</p>;
  }

  return items.map((item, index) => (
    <AnimateOnScroll key={item.id} animation="neo-pop" delay={index * 60}>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start gap-4">
            <EntityLogo
              name={item.company}
              logoSrc={item.logoSrc}
              initials={item.logoInitials}
              color={item.logoColor}
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
          <TagList items={item.technologies} variant="secondary" />
        </CardContent>
      </Card>
    </AnimateOnScroll>
  ));
}
