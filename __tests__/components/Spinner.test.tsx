import { render, screen } from '@testing-library/react';

import { Spinner } from '@/components/ui/Spinner';

describe('Spinner', () => {
  it('exposes status role and default label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows custom label', () => {
    render(<Spinner label="Carregando..." />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('accepts size variants', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.querySelector('.animate-neo-spin')).toBeTruthy();
  });
});
