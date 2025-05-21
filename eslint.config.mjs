import nx from '@nx/eslint-plugin';
import imports from 'eslint-plugin-import';
import sortExports from 'eslint-plugin-sort-exports';
import unusedImports from 'eslint-plugin-unused-imports';

// eslint-disable-next-line import/no-default-export
export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    plugins: {
      import: imports,
      'unused-imports': unusedImports,
    },
    // Override or add rules here
    rules: {
      // Настройка импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    files: ['**/index.ts', '**/index.js'],
    plugins: {
      'sort-exports': sortExports,
    },
    rules: {
      //   Настройка экспортов
      'sort-exports/sort-exports': [
        'error',
        {
          sortDir: 'asc',
          ignoreCase: true,
          sortExportKindFirst: 'type',
        },
      ],
    },
  },
];
