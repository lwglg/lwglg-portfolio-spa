/**
 * Flux-style store for global loading indicator.
 */
import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  label: string | null;
  /** Reference count so concurrent loads don't clear each other early */
  pending: number;
}

interface LoadingActions {
  startLoading: (label?: string) => void;
  stopLoading: () => void;
  resetLoading: () => void;
}

type LoadingStore = LoadingState & LoadingActions;

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  isLoading: false,
  label: null,
  pending: 0,

  startLoading: (label) => {
    const pending = get().pending + 1;
    set({
      isLoading: true,
      pending,
      label: label ?? get().label,
    });
  },

  stopLoading: () => {
    const pending = Math.max(0, get().pending - 1);
    set({
      pending,
      isLoading: pending > 0,
      label: pending > 0 ? get().label : null,
    });
  },

  resetLoading: () => set({ isLoading: false, label: null, pending: 0 }),
}));
