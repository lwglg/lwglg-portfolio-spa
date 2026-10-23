import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/**
 * Coverage is collected from modules that currently have unit tests.
 * Expand this list as new tests are added (target remains ≥ 80 %).
 */
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/components/ui/Button.tsx',
    'src/hooks/useInView.ts',
    'src/i18n/index.ts',
    'src/lib/utils.ts',
    'src/schemas/contactSchema.ts',
    'src/stores/contactStore.ts',
    'src/stores/localeStore.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};

export default createJestConfig(config);
