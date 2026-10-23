'use client';

import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

type LevelItem = { name: string; level: string };
type Group = { id: string; title: string; items: string[] };

function isLevelItem(x: unknown): x is LevelItem {
  return typeof x === 'object' && x !== null && 'name' in x && 'level' in x;
}

export default function SkillsPage() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const s = dict.skills;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <AnimateOnScroll animation="fade-up">
        <header>
          <h1 className="font-head text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h1>
          <p className="mt-2 text-muted-foreground">{s.subtitle}</p>
        </header>
      </AnimateOnScroll>

      <div className="space-y-6">
        {s.sections.map((section, si) => {
          const items = 'items' in section ? (section.items as unknown[]) : undefined;
          const groups = 'groups' in section ? (section.groups as Group[]) : undefined;
          const levelItems = items?.every(isLevelItem) ? (items as LevelItem[]) : null;
          const stringItems =
            items && items.every((x) => typeof x === 'string') ? (items as string[]) : null;

          return (
            <AnimateOnScroll key={section.id} animation="neo-pop" delay={si * 80}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {levelItems && (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {levelItems.map((item) => (
                        <li
                          key={item.name}
                          className="bg-muted/30 flex items-center justify-between gap-3 rounded-base border-2 border-border px-3 py-2 text-sm"
                        >
                          <span className="font-bold">{item.name}</span>
                          <span className="shrink-0 rounded-base border-2 border-border bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">
                            {item.level}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {stringItems && (
                    <div className="flex flex-wrap gap-2">
                      {stringItems.map((item) => (
                        <span
                          key={item}
                          className="rounded-base border-2 border-border bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {groups?.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <h3 className="font-head text-sm font-bold uppercase tracking-wide text-muted-foreground">
                        {group.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="bg-muted/40 rounded-base border-2 border-border px-3 py-1.5 text-sm font-medium text-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AnimateOnScroll>
          );
        })}
      </div>
    </div>
  );
}
