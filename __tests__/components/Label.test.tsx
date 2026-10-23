import { render, screen } from '@testing-library/react';
import { Label } from '@/components/ui/Label';

describe('Label', () => {
  it('renders text content', () => {
    render(<Label htmlFor="x">Nome</Label>);
    expect(screen.getByText('Nome')).toBeInTheDocument();
  });
});
