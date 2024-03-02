module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
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
  },
  reportUnusedDisableDirectives: true,
};
