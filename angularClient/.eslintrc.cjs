module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['import', 'unused-imports'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        curly: 'error',
        'lines-between-class-members': ['error', 'always'],
        'no-multiple-empty-lines': [
          'error',
          {
            max: 1,
            maxEOF: 0,
            maxBOF: 0,
          },
        ],
        'no-trailing-spaces': 'error',
        semi: ['error', 'always'],
        'import/no-duplicates': ['error'],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
              {
                pattern: 'components/**',
                group: 'internal',
              },
              {
                pattern: 'constants/**',
                group: 'internal',
              },
              {
                pattern: 'hooks/**',
                group: 'internal',
              },
              {
                pattern: 'models',
                group: 'internal',
              },
              {
                pattern: 'pages/**',
                group: 'internal',
              },
              {
                pattern: 'services/**',
                group: 'internal',
              },
              {
                pattern: 'utils/**',
                group: 'internal',
              },
              {
                pattern: './*.scss',
                group: 'sibling',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: [],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            'newlines-between': 'never',
          },
        ],
        'unused-imports/no-unused-imports': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
      },
      reportUnusedDisableDirectives: true,
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended', 'plugin:@angular-eslint/template/accessibility'],
      rules: {},
      reportUnusedDisableDirectives: true,
    },
  ],
};
