module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["simple-import-sort", "unused-imports"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "no-unused-imports": "off",
    "simple-import-sort/imports": "error",
    "unused-imports/no-unused-imports": "error"
  }
};
