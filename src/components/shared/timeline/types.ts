/** Common year-range entry used by experience, education and project timelines. */
export interface YearRange {
  id: string;
  label: string;
  startYear?: number;
  endYear?: number;
}

export interface TimelineMenuItem {
  id: string;
  label: string;
  count?: number;
}

export const ACTIVE_RANGE_ALL = 'all' as const;
export type ActiveRangeId = typeof ACTIVE_RANGE_ALL | string;
