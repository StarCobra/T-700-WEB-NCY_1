module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "no-console": "warn",
    "semi": ["error", "never"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "comma-dangle": ["error", "always-multiline"],
    "arrow-parens": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "always"],
    "jsx-quotes": ["error", "prefer-double"]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
      '**/__tests__/**/*.tsx',
      'node_modules/',
      '.next/',
      'build/',
      '*.config.js',
  ],
};
