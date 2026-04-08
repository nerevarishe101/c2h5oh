import nx from '@nx/eslint-plugin';
import imports from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
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
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              onlyDependOnLibsWithTags: ['*'],
              sourceTag: '*',
            },
          ],
          enforceBuildableLibDependency: true,
        },
      ],
    },
  },
  // --- Perfectionist export order from index files
  {
    files: ['**/index.ts'],
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-exports': [
        'error',
        {
          partitionByComment: true,
          partitionByNewLine: true,
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          partitionByComment: true,
          partitionByNewLine: true,
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
      '!**/vite.config.ts',
    ],
    plugins: {
      import: imports,
      perfectionist,
      'unused-imports': unusedImports,
    },
    // Override or add rules here
    rules: (() => {
      const sortInterfacesAndObjectTypesConfiguration = [
        'error',
        {
          groups: [
            'index-signature',
            'required-property',
            'optional-property',
            { newlinesBetween: 1 },
            'required-method',
            'optional-method',
          ],
        },
      ];

      return {
        // Отключить дублирующееся предупреждение
        '@typescript-eslint/no-unused-vars': 'off',
        'import/no-default-export': 'error',

        'import/prefer-default-export': 'off',
        'perfectionist/sort-heritage-clauses': 'error',
        // -- Perfectionist configuration
        // ---- Perfectionist imports
        'perfectionist/sort-imports': [
          'error',
          {
            partitionByComment: true,
          },
        ],
        // ---- Perfectionist sorts
        'perfectionist/sort-interfaces':
          sortInterfacesAndObjectTypesConfiguration,
        'perfectionist/sort-intersection-types': 'error',
        'perfectionist/sort-named-imports': 'error',

        'perfectionist/sort-object-types':
          sortInterfacesAndObjectTypesConfiguration,
        'perfectionist/sort-objects': [
          'error',
          {
            groups: ['property', { newlinesBetween: 1 }, 'method'],
          },
        ],
        'perfectionist/sort-union-types': 'error',
        // -- Other plugins
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
      };
    })(),
  },
];
