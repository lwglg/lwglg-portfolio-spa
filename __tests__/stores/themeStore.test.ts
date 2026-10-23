import { useThemeStore, hydrateThemeStore } from '@/stores/themeStore';
import { DEFAULT_THEME, STORAGE_KEYS } from '@/constants';

describe('themeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useThemeStore.setState({ theme: DEFAULT_THEME });
  });

  it('defaults to system theme', () => {
    expect(useThemeStore.getState().theme).toBe('system');
  });

  it('setTheme updates theme and persists', () => {
    useThemeStore.getState().setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('dark');
  });

  it('cycleTheme rotates light → dark → system → light', () => {
    useThemeStore.getState().setTheme('light');
    useThemeStore.getState().cycleTheme();
    expect(useThemeStore.getState().theme).toBe('dark');
    useThemeStore.getState().cycleTheme();
    expect(useThemeStore.getState().theme).toBe('system');
    useThemeStore.getState().cycleTheme();
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('hydrateThemeStore restores valid stored theme', () => {
    localStorage.setItem(STORAGE_KEYS.theme, 'dark');
    hydrateThemeStore();
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('hydrateThemeStore ignores invalid stored value', () => {
    localStorage.setItem(STORAGE_KEYS.theme, 'neon');
    useThemeStore.setState({ theme: 'system' });
    hydrateThemeStore();
    expect(useThemeStore.getState().theme).toBe('system');
  });
});
