import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/lib/**/*.{ts,tsx}',
    'src/stores/**/*.{ts,tsx}',
    'src/schemas/**/*.{ts,tsx}',
    'src/actions/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    'src/constants/**/*.{ts,tsx}',
    'src/i18n/**/*.{ts,tsx}',
    '!src/i18n/locales/**',
    'src/components/ui/**/*.{ts,tsx}',
    'src/components/shared/**/*.{ts,tsx}',
    'src/components/layout/LanguageSelect.tsx',
    'src/components/layout/ThemeToggle.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/layout/GlobalLoading.tsx',
    // Type-only modules (no runtime coverage)
    '!src/types/**',
    '!src/components/shared/**/definition.ts',
    '!src/components/shared/timeline/types.ts',
    '!src/components/shared/timeline/index.ts',
    // Thin shells / integration
    '!src/app/**',
    '!src/components/forms/**',
    '!src/components/layout/Header.tsx',
    '!src/components/layout/ThemeProvider.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};

export default createJestConfig(config);
