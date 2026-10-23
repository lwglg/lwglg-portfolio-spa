import { render, screen } from '@testing-library/react';

import { GlobalLoading } from '@/components/layout/GlobalLoading';
import { useLoadingStore } from '@/stores/loadingStore';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('GlobalLoading', () => {
  beforeEach(() => {
    useLoadingStore.getState().resetLoading();
  });

  it('renders nothing when idle', () => {
    const { container } = render(<GlobalLoading />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows overlay when loading', () => {
    useLoadingStore.getState().startLoading('Carregando...');
    render(<GlobalLoading />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
});
