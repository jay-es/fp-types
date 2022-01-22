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

    // ブロックなどの後、 return 文などの前に空行を入れる
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["block-like", "multiline-expression"],
        next: "*",
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["return", "throw", "break", "continue"],
      },
    ],
  },
};
