import { render, screen } from '@testing-library/react';

import { Select } from '@/components/ui/Select';

const options = [
  { value: '+55', label: '🇧🇷 +55 (BR)' },
  { value: '+1', label: '🇺🇸 +1 (US)' },
] as const;

describe('Select', () => {
  it('renders all options', () => {
    render(<Select options={options} aria-label="país" defaultValue="+55" />);
    expect(screen.getByLabelText('país')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /BR/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /US/ })).toBeInTheDocument();
  });
});
