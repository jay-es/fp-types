/* eslint-env node */
module.exports = /** @type {import("eslint/lib/shared/types").ConfigData} */ ({
  env: {
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],

    // ブロックなどの後に空行を入れる
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["block-like", "multiline-expression"],
        next: "*",
      },
    ],

    "@typescript-eslint/explicit-module-boundary-types": "warn",
  },
  overrides: [
    {
      files: ["*.spec.ts", "src/oop/_old/**"],
      rules: {
        "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
      },
    },
  ],
});
