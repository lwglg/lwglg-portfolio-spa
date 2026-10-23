import { render, screen } from '@testing-library/react';
import { Textarea } from '@/components/ui/Textarea';

describe('Textarea', () => {
  it('renders multiline field', () => {
    render(<Textarea placeholder="Mensagem" rows={4} />);
    expect(screen.getByPlaceholderText('Mensagem')).toBeInTheDocument();
  });
});
