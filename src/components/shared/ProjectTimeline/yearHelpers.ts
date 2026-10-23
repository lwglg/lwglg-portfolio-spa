import type { ProjectItem, ProjectYearRange } from './definition';

/** Build unique year ranges from projects, newest first. */
export function buildProjectYearRanges(items: ProjectItem[]): ProjectYearRange[] {
  const byId = new Map<string, ProjectYearRange>();
  for (const item of items) {
    if (byId.has(item.yearRangeId)) continue;
    const year = Number.parseInt(item.year, 10) || 0;
    byId.set(item.yearRangeId, {
      id: item.yearRangeId,
      label: item.year,
      year,
    });
  }
  return [...byId.values()].sort((a, b) => b.year - a.year);
}

/** Filter projects by active range id (`all` = no filter). */
export function filterProjectsByYear(items: ProjectItem[], activeRange: string): ProjectItem[] {
  const list =
    activeRange === 'all' ? items : items.filter((item) => item.yearRangeId === activeRange);
  return [...list].sort((a, b) => {
    const ya = Number.parseInt(a.year, 10) || 0;
    const yb = Number.parseInt(b.year, 10) || 0;
    return yb - ya;
  });
}
