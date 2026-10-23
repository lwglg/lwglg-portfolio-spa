import { render, screen } from '@testing-library/react';
import { ConfirmationEmailTemplate } from '@/components/shared/ConfirmationEmailTemplate';
import { getDictionary } from '@/i18n';

const dict = getDictionary('pt-BR');

describe('ConfirmationEmailTemplate', () => {
  it('renders greeting with recipient name', () => {
    render(<ConfirmationEmailTemplate fullName="Ana Silva" dict={dict} />);
    expect(screen.getByText(/Ana Silva/)).toBeInTheDocument();
  });

  it('renders subject-related content from dictionary', () => {
    render(<ConfirmationEmailTemplate fullName="Test" dict={dict} />);
    // body or footer text should appear
    expect(screen.getByText(dict.contact.confirmationEmail.footer)).toBeInTheDocument();
  });
});
