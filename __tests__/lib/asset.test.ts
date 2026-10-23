import { APP_BASE_PATH } from '@/constants';
import { assetPath } from '@/lib/asset';

describe('assetPath', () => {
  it('returns empty string as-is', () => {
    expect(assetPath('')).toBe('');
  });

  it('leaves absolute http(s) URLs untouched', () => {
    expect(assetPath('https://example.com/a.png')).toBe('https://example.com/a.png');
  });

  it('leaves data URIs untouched', () => {
    expect(assetPath('data:image/svg+xml,abc')).toBe('data:image/svg+xml,abc');
  });

  it('prefixes relative paths with APP_BASE_PATH', () => {
    expect(assetPath('/logos/gg-ltda.svg')).toBe(`${APP_BASE_PATH}/logos/gg-ltda.svg`);
  });

  it('normalises paths without leading slash', () => {
    expect(assetPath('photo.svg')).toBe(`${APP_BASE_PATH}/photo.svg`);
  });
});
