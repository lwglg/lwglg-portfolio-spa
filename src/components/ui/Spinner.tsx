'use client';

import { cn } from '@/lib/utils';

export interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
} as const;

/**
 * Neobrutalism spinner: hard-edged square with thick border and offset shadow,
 * rotating on a hard keyframe (no soft blur).
 */
export function Spinner({ className, size = 'md', label }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label ?? 'Loading'}
      className={cn('inline-flex flex-col items-center gap-3', className)}
    >
      <span
        className={cn(
          'block animate-neo-spin rounded-base border-border bg-primary shadow-neo',
          'border-t-transparent border-r-border border-b-border border-l-border',
          sizeMap[size],
        )}
        aria-hidden
      />
      {label ? (
        <span className="font-head text-sm font-bold tracking-tight">{label}</span>
      ) : (
        <span className="sr-only">{label ?? 'Loading'}</span>
      )}
    </div>
  );
}
