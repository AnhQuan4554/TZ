/* eslint-disable import/no-extraneous-dependencies */
const { rules } = require('eslint-config-airbnb-base/rules/style');
const {
  defaultTypes,
} = require('@typescript-eslint/eslint-plugin/dist/rules/ban-types');
const confusingBrowserGlobals = require('confusing-browser-globals');
const { omit } = require('lodash');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: ['arrow-function', 'function-expression'],
      },
    ],
    'prefer-const': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'spaced-comment': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'arrow-body-style': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-plusplus': 'off',
    'no-return-await': 'off',
    'class-methods-use-this': 'off',

    // TypeScript will catch errors at compile time
    'default-case': 'off',
    'consistent-return': 'off',
    'react/prop-types': [
      'error',
      {
        skipUndeclared: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test*.js',
          '**/*.test*.ts',
          '**/*.test*.tsx',
          '**/*.spec.js',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/setupTests.ts',
          '**/*.config.js',
          '**/*.config.ts',
          '**/config-overrides.js',
          '.eslintrc.js',
          '**/jest/**/*',
          '**/tools/**/*',
          '**/db/migrations/**/*',
          '**/functionConfig.js',
          '**/e2e/**/*',
          '**/test/**/*',
          '**/src/db/**/*',
        ],
      },
    ],
    'no-restricted-syntax': [
      'error',
      ...rules['no-restricted-syntax'].filter(
        (s) =>
          typeof s === 'object' &&
          s.selector !== 'ForInStatement' &&
          s.selector !== 'ForOfStatement',
      ),
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: omit(defaultTypes, 'Object', '{}'),
        extendDefaults: false,
      },
    ],
    'no-restricted-globals': ['error', ...confusingBrowserGlobals],
    'prefer-exponentiation-operator': 'error',

    'guard-for-in': 'warn',
    'no-nested-ternary': 'warn',
    'no-await-in-loop': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'max-classes-per-file': 'off',
    strict: 'off',
    curly: ['error', 'all'],
    camelcase: 'warn',
    'no-continue': 'warn',
    '@typescript-eslint/no-var-requires': 0,
    'global-require': 0,
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/tools/**'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-useless-constructor': 'off',
      },
    },
    {
      files: ['**/db/migrations/**', '**/db/seeders/**'],
      rules: {
        camelcase: 'warn',
      },
    },
    {
      files: ['**/*.controller.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
    {
      files: ['services/**', 'packages/backend-libs/**'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
  ignorePatterns: [
    'temp/', //
    '**/coverages/',
    '**/.serverless/',
    '**/.esbuild/',
    '**/dist/',
    'packages/devias-material-kit/',
    'guardian/tymlez-guardian-service/charts/**/*',
    'packages/frontend-libs/build',
    'local/',
    '**/venv/',
  ],
};
