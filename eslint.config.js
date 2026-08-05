import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(
  {
    ignores: [
      "**/dist/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "apps/extension/public/vocabulary/**/*.msgpack.gz",
    ],
  },
  eslint.configs.recommended,
  ...typescriptEslint.configs.strictTypeChecked,
  ...eslintPluginVue.configs["flat/recommended"],
  {
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      parserOptions: {
        parser: typescriptEslint.parser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ...typescriptEslint.configs.disableTypeChecked,
    files: ["**/*.js"],
  },
  {
    files: ["apps/extension/**/*.{js,ts,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["apps/gateway/**/*.{js,ts}", "tools/**/*.{js,ts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  eslintConfigPrettier,
);
