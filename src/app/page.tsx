'use client';

import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

export default function HomePage() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const h = dict.home;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <AnimateOnScroll animation="fade-up" duration={600}>
        <header className="text-center">
          <h1 className="font-head text-4xl font-bold tracking-tight sm:text-5xl">{h.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{h.subtitle}</p>
        </header>
      </AnimateOnScroll>

      <AnimateOnScroll animation="neo-pop" delay={80}>
        <Card>
          <CardHeader>
            <CardTitle>{h.presentation.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-foreground/90">{h.presentation.content}</p>
          </CardContent>
        </Card>
      </AnimateOnScroll>

      <AnimateOnScroll animation="neo-pop" delay={120}>
        <Card>
          <CardHeader>
            <CardTitle>{h.specialties.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {h.specialties.items.map((item, i) => (
                <AnimateOnScroll key={item} animation="fade-up" delay={80 + i * 50}>
                  <div className="flex items-start gap-2 rounded-base border-2 border-border bg-muted/40 px-3 py-2 text-sm font-medium">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {item}
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimateOnScroll>

      <div className="grid gap-6 sm:grid-cols-2">
        <AnimateOnScroll animation="fade-right" delay={100}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{h.workRegime.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">{h.workRegime.content}</p>
            </CardContent>
          </Card>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-left" delay={180}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{h.hiring.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">{h.hiring.content}</p>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
