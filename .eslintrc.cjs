module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:sonarjs/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './tsconfig.json' },
  plugins: ['react-refresh', "import", "prettier", "sonarjs"],
  rules: {
    'react-refresh/only-export-components': 'warn',
    "import/no-named-as-default": 0,
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "groups": [["external", "builtin"], "internal", ["parent", "sibling", "index"]],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "always"
      }
    ],
    "newline-before-return": ["error"],
    "comma-dangle": ["error", "never"],
    "import/no-default-export": "error",
    "no-restricted-exports": ["error", { "restrictedNamedExports": ["default"] }],
    "react-hooks/exhaustive-deps": "error",
    "curly": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-magic-numbers": "warn",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "no-restricted-imports": "error",
    "@typescript-eslint/no-namespace": "off",
    "import/no-unresolved": "off",
    "eol-last": ["error", "always"],
  },
}
