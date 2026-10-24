import { fireEvent, render, screen } from '@testing-library/react';

import { EducationTimeline } from '@/components/shared/EducationTimeline';

const section = {
  yearRanges: [{ id: '2010-2015', label: '2010 — 2015', startYear: 2010, endYear: 2015 }],
  items: [
    {
      id: 'edu1',
      yearRangeId: '2010-2015',
      startYear: 2010,
      endYear: 2015,
      institution: 'UFSC',
      degree: 'Bacharelado',
      period: '2010 — 2015',
      location: 'Florianópolis',
      description: ['Curso de computação'],
      topics: ['Algoritmos'],
      credentialUrl: 'https://example.com/cert',
    },
  ],
};

describe('EducationTimeline', () => {
  it('renders academic section and credential link', () => {
    render(
      <EducationTimeline
        title="Formação"
        subtitle="Educação"
        menuLabel="Períodos"
        academicLabel="Académica"
        coursesLabel="Cursos"
        periodLabel="Período"
        allLabel="Todos"
        credentialLabel="Credencial"
        academic={section}
        courses={{ yearRanges: [], items: [] }}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Formação' })).toBeInTheDocument();
    expect(screen.getByText('Bacharelado')).toBeInTheDocument();
    expect(screen.getByText('UFSC')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Credencial' })).toHaveAttribute(
      'href',
      'https://example.com/cert',
    );
  });

  it('switches to courses section', () => {
    render(
      <EducationTimeline
        title="Formação"
        subtitle="Edu"
        menuLabel="Períodos"
        academicLabel="Académica"
        coursesLabel="Cursos"
        periodLabel="Período"
        allLabel="Todos"
        credentialLabel="Credencial"
        academic={section}
        courses={{
          yearRanges: [{ id: '2020', label: '2020', startYear: 2020, endYear: 2020 }],
          items: [
            {
              id: 'c1',
              yearRangeId: '2020',
              startYear: 2020,
              endYear: 2020,
              institution: 'Online',
              degree: 'Certificado X',
              period: '2020',
              location: 'Remote',
              description: ['Curso online'],
              topics: [],
            },
          ],
        }}
      />,
    );
    fireEvent.click(screen.getByText('Cursos'));
    expect(screen.getByText('Certificado X')).toBeInTheDocument();
  });
});
