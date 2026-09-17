import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';

// Minimal guard config — the Rules of Hooks check catches crashes that
// TypeScript cannot (hooks after early returns = blank page in production).
export default [
  {
    files: ['src/**/*.{ts,tsx}', 'api/**/*.ts'],
    languageOptions: { parser: tsParser },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
    },
  },
];
