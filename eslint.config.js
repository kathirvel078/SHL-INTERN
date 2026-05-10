export default [
  {
    files: ["**/*.js"],

    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },

    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];