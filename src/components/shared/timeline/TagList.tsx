'use client';

import { cn } from '@/lib/utils';

export function TagList({
  items,
  variant = 'secondary',
}: {
  items: string[];
  variant?: 'secondary' | 'accent';
}) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            'rounded-base border-2 border-border px-2 py-0.5 text-xs font-bold',
            variant === 'secondary'
              ? 'bg-secondary text-secondary-foreground'
              : 'bg-accent text-accent-foreground',
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
