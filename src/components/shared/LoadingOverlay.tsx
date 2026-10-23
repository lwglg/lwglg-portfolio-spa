'use client';

import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  visible?: boolean;
  label?: string;
  /** When true, covers the full viewport as a fixed layer */
  fullscreen?: boolean;
  className?: string;
}

export function LoadingOverlay({
  visible = true,
  label,
  fullscreen = true,
  className,
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        'bg-background/80 flex items-center justify-center backdrop-blur-sm',
        fullscreen ? 'fixed inset-0 z-[100]' : 'absolute inset-0 z-10 rounded-base',
        className,
      )}
      role="alert"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4 rounded-base border-2 border-border bg-card px-8 py-6 shadow-neo">
        <Spinner size="lg" label={label} />
      </div>
    </div>
  );
}
