module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    esModuleInterop: true,
  },
  rules: {
    "import/no-unresolved": [0, { caseSensitive: false }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    __webpack_public_path__: true,
    devolutionBundle: true,
  },
};
