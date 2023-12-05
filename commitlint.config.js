module.exports = {
  plugins: ['commitlint-plugin-regex-match'],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-match': [2, 'always', 'TYM-\\d+'],
  },
};
