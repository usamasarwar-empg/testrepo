"use strict";

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  "extends": ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['jsx-a11y'],
  ignorePatterns: ['**/dist/**/*.*'],
  rules: {
    'comma-dangle': 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'jsx-a11y/label-has-for': ['error', {
      required: {
        every: []
      }
    }],
    'jsx-a11y/label-has-associated-control': 'off',
    'no-param-reassign': ['error', {
      props: false
    }]
  }
};