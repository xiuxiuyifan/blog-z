module.exports = {
  extends: ["./typescript", "plugin:vue/vue3-recommended"],
  overrides: [
    {
      file: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
};
