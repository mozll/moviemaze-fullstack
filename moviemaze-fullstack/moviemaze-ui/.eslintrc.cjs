module.exports = {
  root: true,
  env: {
    browser: true, // Pga at koden skal virke og køre i en browser
    es2020: true, // ES2020 syntax
  },
  extends: [
    "eslint:recommended", // banefalet ESLint regler
    "plugin:@typescript-eslint/recommended", // anbefalet TypeScript regler
  ],
  parser: "@typescript-eslint/parser", // Brug TypeScript parser
  parserOptions: {
    ecmaVersion: 11, // ECMAScript 2020 syntax
    sourceType: "module", // Koden bruger ECMAScript modules
  },
  rules: {
    "no-console": "error", // Man må ikke bruge console.log i vores kode
    "@typescript-eslint/no-explicit-any": "off", // Gør så vi ikke bliver advaret om 'any' typen i vores TS kode
  },
};
