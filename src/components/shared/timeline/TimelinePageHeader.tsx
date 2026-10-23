'use client';

import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

export function TimelinePageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <AnimateOnScroll animation="fade-up">
      <header>
        <h1 className="font-head text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      </header>
    </AnimateOnScroll>
  );
}
