'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingStore } from '@/stores/loadingStore';
import { useLocaleStore } from '@/stores/localeStore';
import { getDictionary } from '@/i18n';
import { LoadingOverlay } from '@/components/shared/LoadingOverlay';
import { NAV_LOADING_DURATION_MS } from '@/constants';

/**
 * Global Neobrutalism loading overlay.
 * - Controlled by `useLoadingStore` (startLoading / stopLoading).
 * - Also shows a short pulse on client-side route changes.
 */
export function GlobalLoading() {
  const isLoading = useLoadingStore((s) => s.isLoading);
  const label = useLoadingStore((s) => s.label);
  const startLoading = useLoadingStore((s) => s.startLoading);
  const stopLoading = useLoadingStore((s) => s.stopLoading);
  const pathname = usePathname();
  const locale = useLocaleStore((s) => s.locale);
  const dict = getDictionary(locale);
  const isFirst = useRef(true);
  const navActive = useRef(false);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    // Avoid stacking pending counts on rapid navigations
    if (!navActive.current) {
      startLoading(dict.loading?.navigating);
      navActive.current = true;
    }

    const t = window.setTimeout(() => {
      if (navActive.current) {
        stopLoading();
        navActive.current = false;
      }
    }, NAV_LOADING_DURATION_MS);

    return () => {
      window.clearTimeout(t);
      if (navActive.current) {
        stopLoading();
        navActive.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!isLoading) return null;

  return <LoadingOverlay visible label={label ?? dict.loading?.default} fullscreen />;
}
