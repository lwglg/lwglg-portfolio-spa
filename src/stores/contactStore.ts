/**
 * Flux-style store for contact form submission state.
 * Actions dispatch updates; components select slices.
 */
import { create } from 'zustand';
import type { ContactFormData } from '@/types';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactState {
  status: SubmissionStatus;
  lastSubmitted: ContactFormData | null;
  errorMessage: string | null;
}

interface ContactActions {
  submitStart: () => void;
  submitSuccess: (data: ContactFormData) => void;
  submitError: (message: string) => void;
  reset: () => void;
}

type ContactStore = ContactState & ContactActions;

const initialState: ContactState = {
  status: 'idle',
  lastSubmitted: null,
  errorMessage: null,
};

export const useContactStore = create<ContactStore>((set) => ({
  ...initialState,

  submitStart: () => set({ status: 'submitting', errorMessage: null }),

  submitSuccess: (data) =>
    set({
      status: 'success',
      lastSubmitted: data,
      errorMessage: null,
    }),

  submitError: (message) =>
    set({
      status: 'error',
      errorMessage: message,
    }),

  reset: () => set(initialState),
}));
