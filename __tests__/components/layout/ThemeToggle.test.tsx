import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { DEFAULT_THEME } from '@/constants';
import { useThemeStore } from '@/stores/themeStore';

describe('ThemeToggle', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: DEFAULT_THEME });
  });

  it('renders three theme buttons', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('sets theme when a button is pressed', () => {
    render(<ThemeToggle />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // dark
    expect(['light', 'dark', 'system']).toContain(useThemeStore.getState().theme);
    expect(useThemeStore.getState().theme).not.toBe(DEFAULT_THEME);
  });
});
