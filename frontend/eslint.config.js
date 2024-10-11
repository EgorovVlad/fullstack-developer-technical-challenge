import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-ins (e.g., 'fs', 'path')
            'external', // External libraries (e.g., npm packages)
            'internal', // Internal modules (e.g., utils, services)
            'parent', // Parent imports (e.g., ../foo)
            'sibling', // Sibling imports (e.g., ./foo)
            'index', // Index file imports (e.g., ./)
            'object', // Imports of the form `import * as foo from 'foo'`
            'type', // Type imports (TypeScript)
          ],
          pathGroups: [
            {
              pattern: '@/**', // Adjust to match your project's internal paths (e.g., alias for internal modules)
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always', // Require new lines between groups
          alphabetize: {
            order: 'asc', // Alphabetize within each group
            caseInsensitive: true,
          },
        },
      ],
    },
  }
);
