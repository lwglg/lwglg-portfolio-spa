import { render, screen } from '@testing-library/react';

import { TimelinePageHeader } from '@/components/shared/timeline';

describe('TimelinePageHeader', () => {
  it('renders title and subtitle', () => {
    render(<TimelinePageHeader title="Experiências" subtitle="Histórico" />);
    expect(screen.getByRole('heading', { name: 'Experiências' })).toBeInTheDocument();
    expect(screen.getByText('Histórico')).toBeInTheDocument();
  });
});
