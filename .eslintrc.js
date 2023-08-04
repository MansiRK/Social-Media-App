module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    mocha: true,
  },
  extends: "airbnb-base",
  // parser: "@babel/eslint-parser",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
  },
  rules: {
    "no-console": 0,
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "eol-last": ["error", "never"],
    "function-paren-newline": ["error", "never"],
    "brace-style": ["error", "stroustrup"],
    "no-unused-vars": "off",
  },
}