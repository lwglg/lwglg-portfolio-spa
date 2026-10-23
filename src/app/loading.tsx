import { Spinner } from '@/components/ui/Spinner';

/**
 * Next.js App Router segment loading UI (Neobrutalism).
 * Default locale is pt-BR — label matches shared i18n loading.default.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div className="rounded-base border-2 border-border bg-card px-8 py-6 shadow-neo">
        <Spinner size="lg" label="Carregando..." />
      </div>
    </div>
  );
}
