module.exports = /** @type {import('prettier').Config} */ ({
  ...require("../../.prettierrc.js"),
  overrides: [
    {
      files: ["compose.ts", "flow.ts", "pipe.ts"],
      options: {
        printWidth: 90,
      },
    },
  ],
});
