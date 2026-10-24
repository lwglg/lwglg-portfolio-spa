import { render, screen } from '@testing-library/react';

import { TagList } from '@/components/shared/timeline';

describe('TagList', () => {
  it('renders nothing for empty list', () => {
    const { container } = render(<TagList items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders secondary tags', () => {
    render(<TagList items={['TypeScript', 'Node']} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
  });

  it('renders accent variant', () => {
    render(<TagList items={['ML']} variant="accent" />);
    expect(screen.getByText('ML')).toBeInTheDocument();
  });
});
