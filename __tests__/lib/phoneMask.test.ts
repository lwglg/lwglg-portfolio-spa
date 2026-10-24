import {
  digitsOnly,
  formatPhoneByCountry,
  isPhoneInputChar,
  PHONE_ALLOWED_CHAR_REGEX,
  phoneMaxDigits,
  phonePlaceholder,
} from '@/lib/phoneMask';

describe('digitsOnly', () => {
  it('strips non-digits', () => {
    expect(digitsOnly('(11) 98765-4321')).toBe('11987654321');
    expect(digitsOnly('abc')).toBe('');
  });
});

describe('isPhoneInputChar / PHONE_ALLOWED_CHAR_REGEX', () => {
  it('allows digits and separators', () => {
    expect(isPhoneInputChar('5')).toBe(true);
    expect(isPhoneInputChar('-')).toBe(true);
    expect(isPhoneInputChar('(')).toBe(true);
    expect(isPhoneInputChar(' ')).toBe(true);
    expect(isPhoneInputChar('+')).toBe(true);
    expect(isPhoneInputChar('.')).toBe(true);
    expect(isPhoneInputChar('a')).toBe(false);
    expect(isPhoneInputChar('@')).toBe(false);
  });

  it('allows non-single-char keys (control)', () => {
    expect(isPhoneInputChar('Enter')).toBe(true);
  });

  it('regex matches allowed sequences', () => {
    expect(PHONE_ALLOWED_CHAR_REGEX.test('(11) 9-8')).toBe(true);
    expect(PHONE_ALLOWED_CHAR_REGEX.test('11a')).toBe(false);
  });
});

describe('formatPhoneByCountry', () => {
  it('formats Brazil landline and mobile', () => {
    expect(formatPhoneByCountry('+55', '11')).toBe('(11');
    expect(formatPhoneByCountry('+55', '119876')).toBe('(11) 9876');
    expect(formatPhoneByCountry('+55', '1133334444')).toBe('(11) 3333-4444');
    expect(formatPhoneByCountry('+55', '11987654321')).toBe('(11) 98765-4321');
  });

  it('formats US', () => {
    expect(formatPhoneByCountry('+1', '5')).toBe('(5');
    expect(formatPhoneByCountry('+1', '555123')).toBe('(555) 123');
    expect(formatPhoneByCountry('+1', '5551234567')).toBe('(555) 123-4567');
  });

  it('formats UK, PT, ES, FR', () => {
    expect(formatPhoneByCountry('+44', '7911123456')).toBe('7911 123456');
    expect(formatPhoneByCountry('+351', '912345678')).toBe('912 345 678');
    expect(formatPhoneByCountry('+34', '612345678')).toBe('612 34 56 78');
    expect(formatPhoneByCountry('+33', '612345678')).toBe('6 12 34 56 78');
  });

  it('formats DE, IT, JP, CN, IN', () => {
    expect(formatPhoneByCountry('+49', '15123456789')).toBe('1512 3456789');
    expect(formatPhoneByCountry('+39', '3123456789')).toBe('312 345 6789');
    expect(formatPhoneByCountry('+81', '9012345678')).toBe('90-1234-5678');
    expect(formatPhoneByCountry('+86', '13123456789')).toBe('131 2345 6789');
    expect(formatPhoneByCountry('+91', '9876543210')).toBe('98765 43210');
  });

  it('formats AR, CL, CO, MX, AU', () => {
    expect(formatPhoneByCountry('+54', '1123456789')).toBe('11 2345-6789');
    expect(formatPhoneByCountry('+56', '912345678')).toBe('9 1234 5678');
    expect(formatPhoneByCountry('+57', '3001234567')).toBe('300 123 4567');
    expect(formatPhoneByCountry('+52', '5512345678')).toBe('55 1234 5678');
    expect(formatPhoneByCountry('+61', '0412345678')).toBe('0412 345 678');
  });

  it('uses generic fallback for unknown country', () => {
    const out = formatPhoneByCountry('+999', '123456789012');
    expect(out.replace(/\s/g, '')).toBe('123456789012');
  });

  it('handles empty input', () => {
    expect(formatPhoneByCountry('+55', '')).toBe('');
    expect(formatPhoneByCountry('+1', '')).toBe('');
  });
});

describe('phonePlaceholder / phoneMaxDigits', () => {
  it('returns known placeholders and limits', () => {
    expect(phonePlaceholder('+55')).toContain('11');
    expect(phoneMaxDigits('+55')).toBe(11);
    expect(phoneMaxDigits('+1')).toBe(10);
  });

  it('falls back for unknown codes', () => {
    expect(phonePlaceholder('+999')).toBeTruthy();
    expect(phoneMaxDigits('+999')).toBe(15);
  });
});
