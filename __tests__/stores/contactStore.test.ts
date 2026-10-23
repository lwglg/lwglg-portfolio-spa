import { useContactStore } from '@/stores/contactStore';
import type { ContactFormData } from '@/types';

const sample: ContactFormData = {
  firstName: 'João',
  lastName: 'Silva',
  email: 'joao@example.com',
  countryCode: '+55',
  message: 'Test message',
};

describe('contactStore', () => {
  beforeEach(() => {
    useContactStore.getState().reset();
  });

  it('starts idle', () => {
    expect(useContactStore.getState().status).toBe('idle');
    expect(useContactStore.getState().lastSubmitted).toBeNull();
  });

  it('submitStart sets submitting', () => {
    useContactStore.getState().submitStart();
    expect(useContactStore.getState().status).toBe('submitting');
  });

  it('submitSuccess stores data', () => {
    useContactStore.getState().submitSuccess(sample);
    const state = useContactStore.getState();
    expect(state.status).toBe('success');
    expect(state.lastSubmitted).toEqual(sample);
    expect(state.errorMessage).toBeNull();
  });

  it('submitError sets error message', () => {
    useContactStore.getState().submitError('Network error');
    expect(useContactStore.getState().status).toBe('error');
    expect(useContactStore.getState().errorMessage).toBe('Network error');
  });

  it('reset returns to initial state', () => {
    useContactStore.getState().submitSuccess(sample);
    useContactStore.getState().reset();
    expect(useContactStore.getState().status).toBe('idle');
    expect(useContactStore.getState().lastSubmitted).toBeNull();
  });
});
