import { base } from '@killb/code-style/eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  base({
    tsconfigRootDir: import.meta.dirname,
    ignores: ['lib/**', 'src/types/schema.ts'],
    parserOptions: { projectService: false, project: './tsconfig.eslint.json' },
  }),
  {
    name: 'sdk/tests-reach-private-members-through-any',
    files: ['src/__tests__/**/*.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },
);
