import { render, screen } from '@testing-library/react';

import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('renders a text input', () => {
    render(<Input placeholder="Nome" />);
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
  });

  it('forwards type and disabled', () => {
    render(<Input type="email" disabled aria-label="email" />);
    const el = screen.getByLabelText('email');
    expect(el).toHaveAttribute('type', 'email');
    expect(el).toBeDisabled();
  });
});
