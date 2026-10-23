/**
 * Flux actions for the contact form.
 * Call these from UI; they interact with the store and side-effects.
 */
import type { Dictionary } from '@/i18n';
import { useContactStore } from '@/stores/contactStore';
import type { ContactFormData } from '@/types';

/**
 * Simulated submission (static export has no server).
 * In a real deployment you would POST to an API route or external service.
 * Builds a confirmation e-mail template in the same visual style.
 */
export async function submitContactForm(data: ContactFormData, dict: Dictionary): Promise<void> {
  const { submitStart, submitSuccess, submitError } = useContactStore.getState();

  submitStart();

  try {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Build confirmation e-mail content (template in app style)
    const fullName = `${data.firstName} ${data.lastName}`;
    const confirmation = {
      to: data.email,
      subject: dict.contact.confirmationEmail.subject,
      body: [
        dict.contact.confirmationEmail.greeting.replace('{{name}}', fullName),
        '',
        dict.contact.confirmationEmail.body,
        '',
        dict.contact.confirmationEmail.footer,
      ].join('\n'),
    };

    // In production: send via Resend / SendGrid / etc.
    // For static GitHub Pages we log and treat as success.
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.info('[Contact] Confirmation e-mail template:', confirmation);
    }

    submitSuccess(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : dict.contact.form.error;
    submitError(message);
    throw err;
  }
}
