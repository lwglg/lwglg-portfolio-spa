import { render, screen } from '@testing-library/react';

import { EntityLogo } from '@/components/shared/timeline';

describe('EntityLogo', () => {
  it('renders image when logoSrc is provided', () => {
    render(<EntityLogo name="ACME" logoSrc="/logos/mbras.svg" />);
    expect(screen.getByRole('img', { name: 'ACME' })).toBeInTheDocument();
  });

  it('renders initials fallback', () => {
    const { container } = render(<EntityLogo name="ACME Corp" />);
    expect(container.textContent).toMatch(/AC/);
  });

  it('uses explicit initials and color', () => {
    const { container } = render(<EntityLogo name="X" initials="ZZ" color="#ffdb33" />);
    expect(container.textContent).toContain('ZZ');
  });
});
