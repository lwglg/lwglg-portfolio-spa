import {
  digitsOnly,
  formatPhoneByCountry,
  isPhoneInputChar,
  phoneMaxDigits,
  phonePlaceholder,
} from '@/lib/phoneMask';

describe('digitsOnly', () => {
  it('strips non-digits', () => {
    expect(digitsOnly('(11) 98765-4321')).toBe('11987654321');
  });
});

describe('isPhoneInputChar', () => {
  it('allows digits and separators', () => {
    expect(isPhoneInputChar('5')).toBe(true);
    expect(isPhoneInputChar('-')).toBe(true);
    expect(isPhoneInputChar('(')).toBe(true);
    expect(isPhoneInputChar('a')).toBe(false);
  });
});

describe('formatPhoneByCountry', () => {
  it('formats Brazil mobile', () => {
    expect(formatPhoneByCountry('+55', '11987654321')).toBe('(11) 98765-4321');
  });

  it('formats US', () => {
    expect(formatPhoneByCountry('+1', '5551234567')).toBe('(555) 123-4567');
  });

  it('formats UK', () => {
    expect(formatPhoneByCountry('+44', '7911123456')).toBe('7911 123456');
  });
});

describe('phonePlaceholder / phoneMaxDigits', () => {
  it('returns BR placeholder and digit limit', () => {
    expect(phonePlaceholder('+55')).toContain('11');
    expect(phoneMaxDigits('+55')).toBe(11);
  });
});
