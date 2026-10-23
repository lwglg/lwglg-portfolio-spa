import type { YearRange } from '@/components/shared/timeline';

export type { YearRange };

export interface ExperienceItem {
  id: string;
  yearRangeId: string;
  startYear?: number;
  endYear?: number;
  company: string;
  role: string;
  period: string;
  location: string;
  logoInitials?: string;
  logoColor?: string;
  logoSrc?: string;
  description: string[];
  technologies: string[];
}

export interface ExperienceTimelineProps {
  title: string;
  subtitle: string;
  menuLabel: string;
  allLabel: string;
  yearRanges: YearRange[];
  items: ExperienceItem[];
}
