'use client';

import { assetPath } from '@/lib/asset';

export interface EntityLogoProps {
  name: string;
  logoSrc?: string;
  initials?: string;
  color?: string;
  size?: number;
}

function deriveInitials(name: string, initials?: string): string {
  if (initials) return initials;
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/** Logo image or monogram fallback — shared by experience / education cards. */
export function EntityLogo({ name, logoSrc, initials, color, size = 48 }: EntityLogoProps) {
  const dim = `h-12 w-12`;
  if (logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={assetPath(logoSrc)}
        alt={name}
        width={size}
        height={size}
        className={`${dim} shrink-0 rounded-base border-2 border-border bg-white object-contain p-0.5 shadow-neo-sm`}
      />
    );
  }

  const letters = deriveInitials(name, initials);
  const isLight = color === '#ffdb33';

  return (
    <div
      className={`flex ${dim} shrink-0 items-center justify-center rounded-base border-2 border-border bg-primary font-head text-sm font-bold text-primary-foreground shadow-neo-sm`}
      style={color ? { backgroundColor: color, color: isLight ? '#000' : '#fff' } : undefined}
      aria-hidden
      title={name}
    >
      {letters}
    </div>
  );
}
