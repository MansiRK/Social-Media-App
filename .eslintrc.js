module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  extends: "airbnb-base",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
  },
  rules: {
    "no-console": 0,
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "eol-last": ["error", "never"],
  },
}