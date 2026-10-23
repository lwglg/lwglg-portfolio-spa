import { fireEvent, render, screen } from '@testing-library/react';

import { LanguageSelect } from '@/components/layout/LanguageSelect';
import { useLocaleStore } from '@/stores/localeStore';

describe('LanguageSelect', () => {
  beforeEach(() => {
    useLocaleStore.setState({ locale: 'pt-BR' });
  });

  it('renders locale options', () => {
    render(<LanguageSelect />);
    const select = screen.getByLabelText(/Language|Idioma/i);
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /PT-BR/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /EN-GB/i })).toBeInTheDocument();
  });

  it('changes locale on select', () => {
    render(<LanguageSelect />);
    const select = screen.getByLabelText(/Language|Idioma/i);
    fireEvent.change(select, { target: { value: 'en-GB' } });
    expect(useLocaleStore.getState().locale).toBe('en-GB');
  });
});
