import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        fetch: "readonly",
        URLSearchParams: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "res|next|^err",
        },
      ],
      "arrow-body-style": ["error", "as-needed"],
      "no-param-reassign": [
        "error",
        {
          props: false,
        },
      ],
      "no-console": "warn",
      "func-names": "off",
      "consistent-return": "off",
      radix: "off",
      "no-unused-expressions": "off",
    },
  },
];
