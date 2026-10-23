/**
 * Phone input masking by country dial code.
 * Only digit input is kept; separators are applied for display.
 */

/** Strip everything that is not a digit. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/** Characters allowed while typing (digits + common phone separators). */
export const PHONE_ALLOWED_CHAR_REGEX = /^[0-9()+\-\s.]*$/;

export function isPhoneInputChar(char: string): boolean {
  // Allow control keys handled separately; single printable chars
  if (char.length !== 1) return true;
  return /[0-9()+\-\s.]/.test(char);
}

type MaskFn = (digits: string) => string;

/** Brazil: (AA) NNNNN-NNNN or (AA) NNNN-NNNN */
const formatBR: MaskFn = (d) => {
  const x = d.slice(0, 11);
  if (x.length <= 2) return x.length ? `(${x}` : '';
  if (x.length <= 6) return `(${x.slice(0, 2)}) ${x.slice(2)}`;
  if (x.length <= 10) {
    return `(${x.slice(0, 2)}) ${x.slice(2, 6)}-${x.slice(6)}`;
  }
  return `(${x.slice(0, 2)}) ${x.slice(2, 7)}-${x.slice(7)}`;
};

/** US/CA: (AAA) NNN-NNNN */
const formatUS: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 3) return x.length ? `(${x}` : '';
  if (x.length <= 6) return `(${x.slice(0, 3)}) ${x.slice(3)}`;
  return `(${x.slice(0, 3)}) ${x.slice(3, 6)}-${x.slice(6)}`;
};

/** UK: #### ###### (simplified national) */
const formatUK: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 4) return x;
  return `${x.slice(0, 4)} ${x.slice(4)}`;
};

/** Portugal: ### ### ### */
const formatPT: MaskFn = (d) => {
  const x = d.slice(0, 9);
  if (x.length <= 3) return x;
  if (x.length <= 6) return `${x.slice(0, 3)} ${x.slice(3)}`;
  return `${x.slice(0, 3)} ${x.slice(3, 6)} ${x.slice(6)}`;
};

/** Spain: ### ## ## ## */
const formatES: MaskFn = (d) => {
  const x = d.slice(0, 9);
  if (x.length <= 3) return x;
  if (x.length <= 5) return `${x.slice(0, 3)} ${x.slice(3)}`;
  if (x.length <= 7) return `${x.slice(0, 3)} ${x.slice(3, 5)} ${x.slice(5)}`;
  return `${x.slice(0, 3)} ${x.slice(3, 5)} ${x.slice(5, 7)} ${x.slice(7)}`;
};

/** France: # ## ## ## ## */
const formatFR: MaskFn = (d) => {
  const x = d.slice(0, 9);
  if (x.length <= 1) return x;
  if (x.length <= 3) return `${x.slice(0, 1)} ${x.slice(1)}`;
  if (x.length <= 5) return `${x.slice(0, 1)} ${x.slice(1, 3)} ${x.slice(3)}`;
  if (x.length <= 7) return `${x.slice(0, 1)} ${x.slice(1, 3)} ${x.slice(3, 5)} ${x.slice(5)}`;
  return `${x.slice(0, 1)} ${x.slice(1, 3)} ${x.slice(3, 5)} ${x.slice(5, 7)} ${x.slice(7)}`;
};

/** Germany: simplified #### ####### */
const formatDE: MaskFn = (d) => {
  const x = d.slice(0, 11);
  if (x.length <= 4) return x;
  return `${x.slice(0, 4)} ${x.slice(4)}`;
};

/** Italy: ### ### #### */
const formatIT: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 3) return x;
  if (x.length <= 6) return `${x.slice(0, 3)} ${x.slice(3)}`;
  return `${x.slice(0, 3)} ${x.slice(3, 6)} ${x.slice(6)}`;
};

/** Japan: ##-####-#### */
const formatJP: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 2) return x;
  if (x.length <= 6) return `${x.slice(0, 2)}-${x.slice(2)}`;
  return `${x.slice(0, 2)}-${x.slice(2, 6)}-${x.slice(6)}`;
};

/** China: ### #### #### */
const formatCN: MaskFn = (d) => {
  const x = d.slice(0, 11);
  if (x.length <= 3) return x;
  if (x.length <= 7) return `${x.slice(0, 3)} ${x.slice(3)}`;
  return `${x.slice(0, 3)} ${x.slice(3, 7)} ${x.slice(7)}`;
};

/** India: ##### ##### */
const formatIN: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 5) return x;
  return `${x.slice(0, 5)} ${x.slice(5)}`;
};

/** Argentina: ## ####-#### */
const formatAR: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 2) return x;
  if (x.length <= 6) return `${x.slice(0, 2)} ${x.slice(2)}`;
  return `${x.slice(0, 2)} ${x.slice(2, 6)}-${x.slice(6)}`;
};

/** Chile: # #### #### */
const formatCL: MaskFn = (d) => {
  const x = d.slice(0, 9);
  if (x.length <= 1) return x;
  if (x.length <= 5) return `${x.slice(0, 1)} ${x.slice(1)}`;
  return `${x.slice(0, 1)} ${x.slice(1, 5)} ${x.slice(5)}`;
};

/** Colombia: ### ### #### */
const formatCO: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 3) return x;
  if (x.length <= 6) return `${x.slice(0, 3)} ${x.slice(3)}`;
  return `${x.slice(0, 3)} ${x.slice(3, 6)} ${x.slice(6)}`;
};

/** Mexico: ## #### #### */
const formatMX: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 2) return x;
  if (x.length <= 6) return `${x.slice(0, 2)} ${x.slice(2)}`;
  return `${x.slice(0, 2)} ${x.slice(2, 6)} ${x.slice(6)}`;
};

/** Australia: #### ### ### */
const formatAU: MaskFn = (d) => {
  const x = d.slice(0, 10);
  if (x.length <= 4) return x;
  if (x.length <= 7) return `${x.slice(0, 4)} ${x.slice(4)}`;
  return `${x.slice(0, 4)} ${x.slice(4, 7)} ${x.slice(7)}`;
};

/** Fallback: groups of 3–4 digits */
const formatGeneric: MaskFn = (d) => {
  const x = d.slice(0, 15);
  return x.replace(/(\d{3,4})(?=\d)/g, '$1 ').trim();
};

const MASKS: Record<string, MaskFn> = {
  '+55': formatBR,
  '+1': formatUS,
  '+44': formatUK,
  '+351': formatPT,
  '+34': formatES,
  '+33': formatFR,
  '+49': formatDE,
  '+39': formatIT,
  '+81': formatJP,
  '+86': formatCN,
  '+91': formatIN,
  '+54': formatAR,
  '+56': formatCL,
  '+57': formatCO,
  '+52': formatMX,
  '+61': formatAU,
};

const PLACEHOLDERS: Record<string, string> = {
  '+55': '(11) 98765-4321',
  '+1': '(555) 123-4567',
  '+44': '7911 123456',
  '+351': '912 345 678',
  '+34': '612 34 56 78',
  '+33': '6 12 34 56 78',
  '+49': '1512 3456789',
  '+39': '312 345 6789',
  '+81': '90-1234-5678',
  '+86': '131 2345 6789',
  '+91': '98765 43210',
  '+54': '11 2345-6789',
  '+56': '9 1234 5678',
  '+57': '300 123 4567',
  '+52': '55 1234 5678',
  '+61': '0412 345 678',
};

/** Apply country-specific mask to raw user input. */
export function formatPhoneByCountry(countryCode: string, raw: string): string {
  const digits = digitsOnly(raw);
  const mask = MASKS[countryCode] ?? formatGeneric;
  return mask(digits);
}

export function phonePlaceholder(countryCode: string): string {
  return PLACEHOLDERS[countryCode] ?? '123 456 7890';
}

/** Max digit count for a country (for limiting paste/input). */
export function phoneMaxDigits(countryCode: string): number {
  const limits: Record<string, number> = {
    '+55': 11,
    '+1': 10,
    '+44': 10,
    '+351': 9,
    '+34': 9,
    '+33': 9,
    '+49': 11,
    '+39': 10,
    '+81': 10,
    '+86': 11,
    '+91': 10,
    '+54': 10,
    '+56': 9,
    '+57': 10,
    '+52': 10,
    '+61': 10,
  };
  return limits[countryCode] ?? 15;
}
