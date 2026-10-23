import { render, screen } from '@testing-library/react';

import { LoadingOverlay } from '@/components/shared/LoadingOverlay';

describe('LoadingOverlay', () => {
  it('returns null when not visible', () => {
    const { container } = render(<LoadingOverlay visible={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows spinner and label when visible', () => {
    render(<LoadingOverlay visible label="Aguarde" fullscreen={false} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Aguarde')).toBeInTheDocument();
  });
});
