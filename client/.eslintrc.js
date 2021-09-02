module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx-a11y',
  ],
  rules: {
    'comma-dangle': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          every: [],
        },
      },
    ],
    'jsx-a11y/label-has-associated-control': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
};
