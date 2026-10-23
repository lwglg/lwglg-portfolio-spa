import { render, screen } from '@testing-library/react';

import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

describe('AnimateOnScroll', () => {
  it('renders children', () => {
    render(
      <AnimateOnScroll animation="fade-up">
        <p>Conteúdo</p>
      </AnimateOnScroll>,
    );
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });
});
