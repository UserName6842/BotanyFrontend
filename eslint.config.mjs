// @ts-nocheck
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: false,
  },
  dirs: {
    src: ["./src", "./playground"],
  },
})
  .prepend({
    ignores: ["dist/**", "node_modules/**", "proto/**", "src/proto/**"],
  })
  .append({
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
    },
  })
  .append({
    files: ["**/index.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  });
