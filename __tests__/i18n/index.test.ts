import { getDictionary, defaultLocale, isValidLocale, locales } from '@/i18n';

describe('i18n', () => {
  it('defaultLocale is pt-BR', () => {
    expect(defaultLocale).toBe('pt-BR');
  });

  it('exposes both locales', () => {
    expect(locales).toContain('pt-BR');
    expect(locales).toContain('en-GB');
  });

  it('isValidLocale validates correctly', () => {
    expect(isValidLocale('pt-BR')).toBe(true);
    expect(isValidLocale('en-GB')).toBe(true);
    expect(isValidLocale('fr')).toBe(false);
  });

  it('getDictionary returns pt-BR content', () => {
    const d = getDictionary('pt-BR');
    expect(d.nav.home).toBe('Início');
    expect(d.home.title).toContain('Guilherme');
  });

  it('getDictionary returns en-GB content', () => {
    const d = getDictionary('en-GB');
    expect(d.nav.home).toBe('Home');
    expect(d.home.subtitle).toContain('Software Engineer');
  });

  it('falls back to pt-BR for unknown locale', () => {
    // @ts-expect-error intentional invalid
    const d = getDictionary('xx');
    expect(d.nav.home).toBe('Início');
  });
});
