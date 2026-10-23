import {
  buildProjectYearRanges,
  filterProjectsByYear,
  type ProjectItem,
} from '@/components/shared/ProjectTimeline';

const items: ProjectItem[] = [
  {
    id: 'a',
    yearRangeId: '2026',
    year: '2026',
    title: 'CVTeX',
    description: 'desc',
    repoUrl: 'https://github.com/lwglg/cvtex',
  },
  {
    id: 'b',
    yearRangeId: '2025',
    year: '2025',
    title: 'NLD',
    description: 'desc',
    repoUrl: 'https://github.com/lwglg/nld-img-heat-map',
  },
  {
    id: 'c',
    yearRangeId: '2025',
    year: '2025',
    title: 'Gefuehlmesser',
    description: 'desc',
    repoUrl: 'https://github.com/lwglg/gefuehlmesser',
  },
  {
    id: 'd',
    yearRangeId: '2022',
    year: '2022',
    title: 'Empirical TC',
    description: 'desc',
    articleUrl: 'https://medium.com/example',
  },
];

describe('buildProjectYearRanges', () => {
  it('returns unique years newest first', () => {
    const ranges = buildProjectYearRanges(items);
    expect(ranges.map((r) => r.id)).toEqual(['2026', '2025', '2022']);
    expect(ranges[1].label).toBe('2025');
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

  it('sorts by year descending', () => {
    const filtered = filterProjectsByYear(items, 'all');
    expect(filtered.map((p) => p.year)).toEqual(['2026', '2025', '2025', '2022']);
  });
});
