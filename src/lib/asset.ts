import { APP_BASE_PATH } from '@/constants';

/**
 * Prefix public asset paths with Next.js basePath when deployed to GitHub Pages.
 */
export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('data:')) return path;

  const normalized = path.startsWith('/') ? path : `/${path}`;

  return `${APP_BASE_PATH}${normalized}`;
}
