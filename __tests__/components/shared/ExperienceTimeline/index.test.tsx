import { fireEvent, render, screen } from '@testing-library/react';

import { ExperienceTimeline } from '@/components/shared/ExperienceTimeline';

const yearRanges = [{ id: '2020-present', label: '2020 — …', startYear: 2020, endYear: 9999 }];

const items = [
  {
    id: '1',
    yearRangeId: '2020-present',
    startYear: 2020,
    endYear: 9999,
    company: 'ACME',
    role: 'Engineer',
    period: '2020 — presente',
    location: 'Remote',
    description: ['Built APIs'],
    technologies: ['TypeScript'],
  },
];

describe('ExperienceTimeline', () => {
  it('renders title and experience card', () => {
    render(
      <ExperienceTimeline
        title="Experiências"
        subtitle="Profissional"
        menuLabel="Anos"
        allLabel="Todos"
        yearRanges={yearRanges}
        items={items}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Experiências' })).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('ACME')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('filters via side menu', () => {
    render(
      <ExperienceTimeline
        title="Exp"
        subtitle="Sub"
        menuLabel="Anos"
        allLabel="Todos"
        yearRanges={yearRanges}
        items={items}
      />,
    );
    fireEvent.click(screen.getByText('Todos'));
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });
});
