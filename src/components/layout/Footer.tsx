'use client';

import { SOCIAL_LINKS } from '@/constants';
import { getDictionary } from '@/i18n';
import { useLocaleStore } from '@/stores/localeStore';

const SOCIAL_LABELS: Record<(typeof SOCIAL_LINKS)[number]['key'], string> = {
  socialGithub: 'GitHub',
  socialMedium: 'Medium',
  socialLinkedin: 'LinkedIn',
};

export function Footer() {
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 mt-auto border-t-2 border-border">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-muted-foreground">
        <p className="font-bold text-foreground">{dict.footer.company}</p>
        <p className="mt-1">{dict.footer.cnpj}</p>
        <p className="mt-3">
          © {year} Guilherme Gonçalves. {dict.footer.rights}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
          {SOCIAL_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              {SOCIAL_LABELS[key]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
