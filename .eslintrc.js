module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules:  {
    "@typescript-eslint/indent": ["warning", 2],
    "@typescript-eslint/no-explicit-any": "none",
    "@typescript-eslint/explicit-function-return-type": ["warning", {
      allowTypedFunctionExpressions: true
    }],
    "prettier/prettier": "error",
    "react/prop-types": false,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  plugins: [
    "react-hooks"
  ],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    ecmaFeatures:  {
      jsx:  true,
    },
  },
  env: {
    amd: true,
    node: true,
    jest: true,
    browser: true
  },
  settings:  {
    react:  {
      version:  'detect',
    },
  },
};