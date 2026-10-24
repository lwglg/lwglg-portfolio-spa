import type { YearRange } from '@/components/shared/timeline';

export type { YearRange };

export interface ProjectItem {
  id: string;
  yearRangeId: string;
  /** Display year label (e.g. "2026") */
  year: string;
  startYear?: number;
  endYear?: number;
  title: string;
  description: string;
  repoUrl?: string | null;
  articleUrl?: string | null;
  technologies?: string[];
}

export interface ProjectTimelineProps {
  title: string;
  subtitle: string;
  menuLabel: string;
  allLabel: string;
  yearRanges: YearRange[];
  items: ProjectItem[];
}
