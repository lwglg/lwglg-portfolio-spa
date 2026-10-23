export type Locale = 'pt-BR' | 'en-GB';

export type Theme = 'light' | 'dark' | 'system';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  organisation?: string;
  countryCode: string;
  phone?: string;
  message: string;
}

export interface Experience {
  id: string;
  /** Links the card to a sidebar year-range entry */
  yearRangeId: string;
  startYear?: number;
  endYear?: number;
  company: string;
  role: string;
  period: string;
  location: string;
  logoInitials?: string;
  logoColor?: string;
  description: string[];
  technologies: string[];
}

export interface YearRange {
  id: string;
  label: string;
  startYear?: number;
  endYear?: number;
}

export interface Interest {
  id: string;
  title: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  articleUrl?: string;
  repoUrl?: string;
  year: string;
}

export interface HomeSummary {
  presentation: string;
  specialties: string[];
  workRegime: string;
  hiring: string;
}
