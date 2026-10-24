import { fireEvent, render, screen } from '@testing-library/react';

import { ProjectTimeline } from '@/components/shared/ProjectTimeline';

const yearRanges = [
  { id: '2026', label: '2026', startYear: 2026, endYear: 2026 },
  { id: '2025', label: '2025', startYear: 2025, endYear: 2025 },
];

const items = [
  {
    id: 'cvtex',
    yearRangeId: '2026',
    year: '2026',
    startYear: 2026,
    endYear: 2026,
    title: 'CVTeX',
    description: 'CV tool',
    repoUrl: 'https://github.com/lwglg/cvtex',
    technologies: ['Python'],
  },
  {
    id: 'nld',
    yearRangeId: '2025',
    year: '2025',
    startYear: 2025,
    endYear: 2025,
    title: 'NLD',
    description: 'API',
    repoUrl: 'https://github.com/lwglg/nld-img-heat-map',
  },
];

describe('ProjectTimeline', () => {
  it('renders projects and year menu', () => {
    render(
      <ProjectTimeline
        title="Projetos"
        subtitle="Pessoais"
        menuLabel="Anos"
        allLabel="Todos"
        yearRanges={yearRanges}
        items={items}
      />,
    );
    expect(screen.getByText('CVTeX')).toBeInTheDocument();
    expect(screen.getByText('NLD')).toBeInTheDocument();
    fireEvent.click(screen.getByText('2026'));
    expect(screen.getByText('CVTeX')).toBeInTheDocument();
    expect(screen.queryByText('NLD')).not.toBeInTheDocument();
  });
});
