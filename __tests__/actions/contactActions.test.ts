import { submitContactForm } from '@/actions/contactActions';
import { getDictionary } from '@/i18n';
import { useContactStore } from '@/stores/contactStore';
import type { ContactFormData } from '@/types';

const dict = getDictionary('pt-BR');

const validData: ContactFormData = {
  firstName: 'Guilherme',
  lastName: 'Gonçalves',
  email: 'test@example.com',
  organisation: 'GLG',
  countryCode: '+55',
  phone: '51999999999',
  message: 'Olá, contacto de teste.',
};

describe('submitContactForm', () => {
  beforeEach(() => {
    useContactStore.getState().reset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('transitions idle → submitting → success', async () => {
    const promise = submitContactForm(validData, dict);
    expect(useContactStore.getState().status).toBe('submitting');

    await jest.advanceTimersByTimeAsync(800);
    await promise;

    const state = useContactStore.getState();
    expect(state.status).toBe('success');
    expect(state.lastSubmitted?.email).toBe(validData.email);
  });

  it('records error when store submit path throws', async () => {
    useContactStore.setState({
      submitSuccess: () => {
        throw new Error('boom');
      },
    });

    // Attach rejection handler before advancing timers so Jest does not
    // treat the rejection as unhandled before the assertion runs.
    const promise = submitContactForm(validData, dict);
    const expectation = expect(promise).rejects.toThrow('boom');

    await jest.advanceTimersByTimeAsync(800);
    await expectation;

    expect(useContactStore.getState().status).toBe('error');
    expect(useContactStore.getState().errorMessage).toBe('boom');
  });
});
