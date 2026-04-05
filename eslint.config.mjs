import { defineConfig, globalIgnores } from "eslint/config";
import { configs as tseslintConfigs } from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import nextPlugin from "@next/eslint-plugin-next";
import reactCompilerPlugin from "eslint-plugin-react-compiler";

const eslintConfig = defineConfig([
  // Global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "public/**",
    ".agents/**",
    "coverage/**",
    "next-env.d.ts",
  ]),

  // TypeScript strict checking
  {
    name: "project/typescript",
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslintConfigs.strict],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },

  // React, JSX a11y, and Next.js
  {
    name: "project/react-next",
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs["recommended-latest"].rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // React 19 — no need for prop-types or explicit React imports
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      // R3F uses custom props like args, attach, etc.
      "react/no-unknown-property": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // React Compiler
  {
    name: "project/react-compiler",
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      "react-compiler": reactCompilerPlugin,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
]);

export default eslintConfig;
