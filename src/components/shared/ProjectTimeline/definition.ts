export interface ProjectItem {
  id: string;
  yearRangeId: string;
  year: string;
  title: string;
  description: string;
  repoUrl?: string | null;
  articleUrl?: string | null;
  technologies?: string[];
}

export interface ProjectYearRange {
  id: string;
  label: string;
  year: number;
}

export interface ProjectTimelineProps {
  title: string;
  subtitle: string;
  menuLabel: string;
  allLabel: string;
  items: ProjectItem[];
}
