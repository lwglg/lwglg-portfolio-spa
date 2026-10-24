import {
  buildProjectYearRanges,
  filterProjectsByYear,
  type ProjectItem,
} from '@/components/shared/ProjectTimeline';
import type { YearRange } from '@/components/shared/timeline';

const yearRanges: YearRange[] = [
  { id: '2026', label: '2026', startYear: 2026, endYear: 2026 },
  { id: '2025', label: '2025', startYear: 2025, endYear: 2025 },
  { id: '2022', label: '2022', startYear: 2022, endYear: 2022 },
];

const items: ProjectItem[] = [
  {
    id: 'a',
    yearRangeId: '2026',
    year: '2026',
    startYear: 2026,
    endYear: 2026,
    title: 'CVTeX',
    description: 'desc',
    repoUrl: 'https://github.com/lwglg/cvtex',
  },
  {
    id: 'b',
    yearRangeId: '2025',
    year: '2025',
    startYear: 2025,
    endYear: 2025,
    title: 'NLD',
    description: 'desc',
    repoUrl: 'https://github.com/lwglg/nld-img-heat-map',
  },
  {
    id: 'c',
    yearRangeId: '2025',
    year: '2025',
    startYear: 2025,
    endYear: 2025,
    title: 'Gefuehlmesser',
    description: 'desc',
    repoUrl: 'https://github.com/lwglg/gefuehlmesser',
  },
  {
    id: 'd',
    yearRangeId: '2022',
    year: '2022',
    startYear: 2022,
    endYear: 2022,
    title: 'Empirical TC',
    description: 'desc',
    articleUrl: 'https://medium.com/example',
  },
];

describe('buildProjectYearRanges', () => {
  it('returns configured ranges that have items, newest first', () => {
    const ranges = buildProjectYearRanges(yearRanges, items);
    expect(ranges.map((r) => r.id)).toEqual(['2026', '2025', '2022']);
    expect(ranges[0]).toMatchObject({ startYear: 2026, endYear: 2026 });
  });

  it('synthesises missing ranges from items', () => {
    const ranges = buildProjectYearRanges([], items);
    expect(ranges.map((r) => r.id).sort()).toEqual(['2022', '2025', '2026']);
  });
});

describe('filterProjectsByYear', () => {
  it('returns all when activeRange is all', () => {
    expect(filterProjectsByYear(items, 'all')).toHaveLength(4);
  });

  it('filters by yearRangeId', () => {
    const filtered = filterProjectsByYear(items, '2025');
    expect(filtered).toHaveLength(2);
    expect(filtered.every((p) => p.yearRangeId === '2025')).toBe(true);
  });

  it('sorts by startYear descending', () => {
    const filtered = filterProjectsByYear(items, 'all');
    expect(filtered.map((p) => p.year)).toEqual(['2026', '2025', '2025', '2022']);
  });
});
