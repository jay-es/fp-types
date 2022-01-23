/* eslint-env node */
module.exports = {
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

    // 未使用引数を許可
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
  },
};
