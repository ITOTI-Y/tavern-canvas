import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(
  {
    ignores: [
      "**/dist/**",
      "docs/_dev/**",
      "output/**",
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
        extraFileExtensions: [".vue"],
        projectService: {
          allowDefaultProject: ["*.config.ts"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ...typescriptEslint.configs.disableTypeChecked,
    files: ["**/*.{cjs,js,mjs}"],
  },
  {
    files: ["**/*.{spec,test}.ts"],
    rules: {
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-deprecated": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  },
  {
    files: ["tests/harness/src/media_dialogs_host.ts"],
    rules: {
      // The browser smoke harness intentionally keeps each selectable panel in one source file.
      "vue/one-component-per-file": "off",
    },
  },
  {
    files: ["packages/core/src/capability_registry.ts"],
    rules: {
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
    },
  },
  {
    files: ["apps/extension/src/host/tavern_helper_host.ts"],
    rules: {
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    files: ["apps/extension/src/**/*.{js,ts,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: [
      "apps/extension/scripts/**/*.{cjs,js,mjs,ts}",
      "tools/**/*.{cjs,js,mjs,ts}",
      "tests/harness/**/*.{cjs,js,mjs}",
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  eslintConfigPrettier,
);
