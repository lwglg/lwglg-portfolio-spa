import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';

describe('Card', () => {
  it('renders composed card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
          <CardDescription>Subtítulo</CardDescription>
        </CardHeader>
        <CardContent>Corpo</CardContent>
      </Card>,
    );
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo')).toBeInTheDocument();
    expect(screen.getByText('Corpo')).toBeInTheDocument();
  });
});
