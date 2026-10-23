import type { ContactFormData, Locale, Theme } from '@/types';

describe('types (compile-time contracts)', () => {
  it('Locale accepts supported codes', () => {
    const locales: Locale[] = ['pt-BR', 'en-GB'];
    expect(locales).toHaveLength(2);
  });

  it('Theme accepts light/dark/system', () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    expect(themes).toContain('system');
  });

  it('ContactFormData shape is usable', () => {
    const data: ContactFormData = {
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      countryCode: '+55',
      message: 'hi',
    };
    expect(data.email).toContain('@');
  });
});
