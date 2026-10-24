import {
  buildDynamicYearRanges,
  countByYearRangeId,
  filterByYearRange,
  formatYearSpan,
  type YearRange,
} from '@/components/shared/timeline';

const ranges: YearRange[] = [
  { id: '2020-present', label: '2020 — …', startYear: 2020, endYear: 9999 },
  { id: '2018-2019', label: '2018 — 2019', startYear: 2018, endYear: 2019 },
];

const items = [
  { yearRangeId: '2020-present', startYear: 2020, endYear: 9999 },
  { yearRangeId: '2020-present', startYear: 2021, endYear: 2022 },
  { yearRangeId: '2015-solo', startYear: 2015, endYear: 2015 },
];

describe('formatYearSpan', () => {
  it('formats open-ended ranges', () => {
    expect(formatYearSpan(2020, 9999)).toBe('2020 — …');
  });
  it('formats single year', () => {
    expect(formatYearSpan(2015, 2015)).toBe('2015');
  });
  it('formats spans', () => {
    expect(formatYearSpan(2018, 2019)).toBe('2018 — 2019');
  });
});

describe('buildDynamicYearRanges', () => {
  it('includes configured used ranges and synthesises missing ones', () => {
    const result = buildDynamicYearRanges(ranges, items);
    const ids = result.map((r) => r.id);
    expect(ids).toContain('2020-present');
    expect(ids).toContain('2015-solo');
    expect(ids).not.toContain('2018-2019');
    expect(result[0].startYear).toBeGreaterThanOrEqual(result[result.length - 1].startYear ?? 0);
  });

  it('returns empty when no items', () => {
    expect(buildDynamicYearRanges(ranges, [])).toEqual([]);
  });
});

describe('filterByYearRange', () => {
  it('returns all for all', () => {
    expect(filterByYearRange(items, 'all')).toHaveLength(3);
  });
  it('filters by id', () => {
    expect(filterByYearRange(items, '2020-present')).toHaveLength(2);
  });
});

describe('countByYearRangeId', () => {
  it('counts matching items', () => {
    expect(countByYearRangeId(items, '2020-present')).toBe(2);
    expect(countByYearRangeId(items, 'missing')).toBe(0);
  });
});
