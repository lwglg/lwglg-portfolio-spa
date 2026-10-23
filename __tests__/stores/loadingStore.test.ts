import { useLoadingStore } from '@/stores/loadingStore';

describe('loadingStore', () => {
  beforeEach(() => {
    useLoadingStore.getState().resetLoading();
  });

  it('starts idle', () => {
    const s = useLoadingStore.getState();
    expect(s.isLoading).toBe(false);
    expect(s.pending).toBe(0);
    expect(s.label).toBeNull();
  });

  it('startLoading sets flag and label', () => {
    useLoadingStore.getState().startLoading('Carregando...');
    const s = useLoadingStore.getState();
    expect(s.isLoading).toBe(true);
    expect(s.pending).toBe(1);
    expect(s.label).toBe('Carregando...');
  });

  it('reference-counts concurrent loads', () => {
    const { startLoading, stopLoading } = useLoadingStore.getState();
    startLoading('A');
    startLoading('B');
    expect(useLoadingStore.getState().pending).toBe(2);
    expect(useLoadingStore.getState().isLoading).toBe(true);
    stopLoading();
    expect(useLoadingStore.getState().pending).toBe(1);
    expect(useLoadingStore.getState().isLoading).toBe(true);
    stopLoading();
    expect(useLoadingStore.getState().pending).toBe(0);
    expect(useLoadingStore.getState().isLoading).toBe(false);
    expect(useLoadingStore.getState().label).toBeNull();
  });

  it('resetLoading clears everything', () => {
    useLoadingStore.getState().startLoading('x');
    useLoadingStore.getState().startLoading('y');
    useLoadingStore.getState().resetLoading();
    const s = useLoadingStore.getState();
    expect(s.isLoading).toBe(false);
    expect(s.pending).toBe(0);
    expect(s.label).toBeNull();
  });

  it('stopLoading never goes below zero pending', () => {
    useLoadingStore.getState().stopLoading();
    expect(useLoadingStore.getState().pending).toBe(0);
  });
});
