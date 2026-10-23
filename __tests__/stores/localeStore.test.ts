import { useLocaleStore } from '@/stores/localeStore';

describe('localeStore', () => {
  beforeEach(() => {
    useLocaleStore.setState({ locale: 'pt-BR' });
  });

  it('starts with pt-BR by default', () => {
    expect(useLocaleStore.getState().locale).toBe('pt-BR');
  });

  it('setLocale updates locale', () => {
    useLocaleStore.getState().setLocale('en-GB');
    expect(useLocaleStore.getState().locale).toBe('en-GB');
  });

  it('toggleLocale switches between pt-BR and en-GB', () => {
    useLocaleStore.getState().toggleLocale();
    expect(useLocaleStore.getState().locale).toBe('en-GB');
    useLocaleStore.getState().toggleLocale();
    expect(useLocaleStore.getState().locale).toBe('pt-BR');
  });
});
