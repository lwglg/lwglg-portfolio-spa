import type { YearRange } from '@/components/shared/timeline';

export type { YearRange };

export interface EducationItem {
  id: string;
  yearRangeId: string;
  startYear?: number;
  endYear?: number;
  institution: string;
  degree: string;
  period: string;
  location: string;
  logoSrc?: string;
  description: string[];
  topics: string[];
  credentialUrl?: string | null;
}

export interface EducationSection {
  yearRanges: YearRange[];
  items: EducationItem[];
}

export type EducationSectionKey = 'academic' | 'courses';

export interface EducationTimelineProps {
  title: string;
  subtitle: string;
  menuLabel: string;
  academicLabel: string;
  coursesLabel: string;
  periodLabel: string;
  allLabel: string;
  credentialLabel: string;
  academic: EducationSection;
  courses: EducationSection;
}
