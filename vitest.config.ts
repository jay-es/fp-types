/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~~/": "/",
      "~/": "/src/",
    },
  },
  test: {
    exclude: ["**/_old/**"],
  },
});
