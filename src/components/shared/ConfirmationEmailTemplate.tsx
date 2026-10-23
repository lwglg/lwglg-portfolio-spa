/**
 * Template de e-mail de confirmação no mesmo estilo visual da aplicação (neobrutalism).
 * Usado pela action submitContactForm; pode ser renderizado em HTML para serviços de e-mail.
 */
import type { Dictionary } from '@/i18n';

interface Props {
  fullName: string;
  dict: Dictionary;
}

export function ConfirmationEmailTemplate({ fullName, dict }: Props) {
  const c = dict.contact.confirmationEmail;

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        maxWidth: 560,
        margin: '0 auto',
        border: '3px solid #000',
        boxShadow: '6px 6px 0 #000',
        background: '#fffbf0',
        color: '#000',
      }}
    >
      <div
        style={{
          background: '#ffdb33',
          borderBottom: '3px solid #000',
          padding: '16px 24px',
          fontWeight: 900,
          fontSize: 20,
        }}
      >
        Guilherme Gonçalves
      </div>
      <div style={{ padding: 24 }}>
        <p style={{ fontWeight: 700, marginBottom: 12 }}>
          {c.greeting.replace('{{name}}', fullName)}
        </p>
        <p style={{ lineHeight: 1.6, marginBottom: 24 }}>{c.body}</p>
        <p style={{ fontWeight: 700 }}>{c.footer}</p>
      </div>
    </div>
  );
}
