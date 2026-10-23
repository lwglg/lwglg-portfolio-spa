'use client';

import { Github, Linkedin, BookOpen } from 'lucide-react';
import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { assetPath } from '@/lib/asset';
import {
  TYPESCRIPT_VERSION,
  NODE_VERSION,
  SOCIAL_LINKS,
  ASSET_PATHS,
} from '@/constants';

export default function AboutPage() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const a = dict.about;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <AnimateOnScroll animation="fade-up">
        <header>
          <h1 className="font-head text-3xl font-bold tracking-tight sm:text-4xl">{a.title}</h1>
          <p className="mt-2 text-muted-foreground">{a.subtitle}</p>
        </header>
      </AnimateOnScroll>

      <div className="grid gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:items-start">
        {/* Left panel: photo + social */}
        <AnimateOnScroll animation="fade-right">
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-base border-2 border-border bg-card shadow-neo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath(ASSET_PATHS.photo)}
                alt={a.photoAlt}
                width={460}
                height={460}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ key, href, icon }) => {
                const Icon =
                  icon === 'github' ? Github : icon === 'linkedin' ? Linkedin : BookOpen;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-w-[7rem] flex-1 items-center justify-center gap-2 rounded-base border-2 border-border bg-background px-3 py-2 text-sm font-bold shadow-neo-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {a[key]}
                  </a>
                );
              })}
            </div>
          </aside>
        </AnimateOnScroll>

        {/* Right panel: tech meta */}
        <AnimateOnScroll animation="fade-up" delay={80}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {a.developedBy}: {a.developerName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm leading-relaxed">
              <dl className="space-y-3">
                <div>
                  <dt className="font-head text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {a.mainLanguage}
                  </dt>
                  <dd className="mt-1 font-bold">TypeScript v{TYPESCRIPT_VERSION}</dd>
                </div>
                <div>
                  <dt className="font-head text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {a.runtime}
                  </dt>
                  <dd className="mt-1 font-bold">Node.js v{NODE_VERSION} (LTS)</dd>
                </div>
                <div>
                  <dt className="font-head text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {a.designPattern}
                  </dt>
                  <dd className="mt-1">{a.designPatternValue}</dd>
                </div>
              </dl>

              <div>
                <h3 className="font-head text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {a.mainLibraries}
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  {a.libraries.map((lib) => (
                    <li key={lib}>{lib}</li>
                  ))}
                </ul>
              </div>

              <p className="rounded-base border-2 border-border bg-muted/40 px-3 py-2 text-muted-foreground">
                {a.architectureNote}
              </p>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
