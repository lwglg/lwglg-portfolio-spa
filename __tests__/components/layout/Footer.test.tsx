import { render, screen } from '@testing-library/react';

import { Footer } from '@/components/layout/Footer';
import { useLocaleStore } from '@/stores/localeStore';

describe('Footer', () => {
  beforeEach(() => {
    useLocaleStore.setState({ locale: 'pt-BR' });
  });

  it('renders social links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'href',
      expect.stringContaining('github.com'),
    );
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Medium/i })).toBeInTheDocument();
  });
});
