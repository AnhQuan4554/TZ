const eslintRc = require('./.eslintrc');

module.exports = {
  ...eslintRc,

  parserOptions: {
    ...eslintRc.parserOptions,
    project: './tsconfig.eslint.json',
  },
  rules: {
    ...eslintRc.rules,
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/return-await': 'error',
    'no-return-await': 'off',
    'require-await': 'off',
  },
  overrides: [
    ...eslintRc.overrides,
    {
      files: [
        '**/*.js',
        '**/*.test.js',
        '**/*.test.ts',
        '**/*.spec.js',
        '**/*.spec.ts',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
