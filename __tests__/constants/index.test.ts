import {
  NAV_ITEMS,
  COUNTRY_CODES,
  SOCIAL_LINKS,
  THEMES,
  DEFAULT_THEME,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  DEFAULT_COUNTRY_CODE,
  ASSET_PATHS,
  STORAGE_KEYS,
} from '@/constants';

describe('shared constants', () => {
  it('NAV_ITEMS has unique keys and trailing-slash routes', () => {
    const keys = NAV_ITEMS.map((n) => n.key);
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys).toContain('home');
    expect(keys).toContain('contact');
    NAV_ITEMS.filter((n) => n.href !== '/').forEach((n) => {
      expect(n.href.endsWith('/')).toBe(true);
    });
  });

  it('COUNTRY_CODES include Brazil default', () => {
    expect(DEFAULT_COUNTRY_CODE).toBe('+55');
    expect(COUNTRY_CODES.some((c) => c.value === '+55')).toBe(true);
    COUNTRY_CODES.forEach((c) => {
      expect(c.label).toMatch(/\+/);
    });
  });

  it('SOCIAL_LINKS point to public profiles', () => {
    expect(SOCIAL_LINKS).toHaveLength(3);
    SOCIAL_LINKS.forEach((s) => {
      expect(s.href).toMatch(/^https:\/\//);
    });
  });

  it('theme and locale defaults are valid', () => {
    expect(THEMES).toContain(DEFAULT_THEME);
    expect(SUPPORTED_LOCALES).toContain(DEFAULT_LOCALE);
  });

  it('ASSET_PATHS and STORAGE_KEYS are defined', () => {
    expect(ASSET_PATHS.logo).toMatch(/\.svg$/);
    expect(STORAGE_KEYS.theme).toBe('theme');
    expect(STORAGE_KEYS.locale).toBe('locale');
  });
});
