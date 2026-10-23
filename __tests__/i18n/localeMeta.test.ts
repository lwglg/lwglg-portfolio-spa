import { localeMeta, getLocaleMeta } from '@/i18n/localeMeta';

describe('localeMeta', () => {
  it('includes pt-BR and en-GB', () => {
    const codes = localeMeta.map((m) => m.code);
    expect(codes).toContain('pt-BR');
    expect(codes).toContain('en-GB');
  });

  it('getLocaleMeta returns matching meta', () => {
    const meta = getLocaleMeta('en-GB');
    expect(meta.code).toBe('en-GB');
    expect(meta.flag).toBeTruthy();
    expect(meta.shortLabel).toBeTruthy();
  });

  it('getLocaleMeta falls back to first entry for unknown code', () => {
    const meta = getLocaleMeta('xx-XX' as 'pt-BR');
    expect(meta).toEqual(localeMeta[0]);
  });
});
