import eslint from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'
 
export default tseslint.config(
  {
    ignores: ['**/public', '**/dist', '**/dist/*', '**/tests/*', 'coverage', '.astro/*', 'node_modules/*'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{mjs,cjs,js,ts,astro}'],
    languageOptions: { ecmaVersion: 'latest', globals: globals.browser },
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off', // Disable the base rule, redundant with unused-imports plugin
      '@typescript-eslint/no-unused-vars': 'off', // Disable the base rule, redundant with unused-imports plugin
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'warn',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: ['builtin', 'external', 'sibling', 'parent'],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          pathGroups: [
            {
              group: 'external',
              pattern: '@/**',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
)