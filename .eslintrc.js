module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  plugins: ['react', 'react-hooks', 'prettier'],
  // ESLint extends configurations recursively
  extends: [
    'alloy',
    'alloy/react',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    'prettier',
    'prettier/babel',
    'prettier/react',
  ],
  // 自定义规则，可以覆盖掉extends的配置,0-off,1-warn,2-error
  rules: {
    'no-param-reassign': 0,
    'no-invalid-this': 0,
    'no-unused-vars': 1,
    'guard-for-in': 0,
    'prefer-const': 0,
    'prefer-spread': 0,
    'prefer-rest-params': 0,
    radix: 0,
    'react/prop-types': 0,
    'react/no-find-dom-node': 0,
    'react/no-deprecated': 0,
    'react/display-name': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'react/prefer-es6-class': 0,
    'prettier/prettier': 1,
  },
};
