module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // .astro files are checked by `astro check`; ESLint only covers plain JS/TS.
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '.astro/',
    'public/',
    'src/content/',
    '*.astro'
  ],
  // Formatting is Prettier's job (`npm run prettier:check`); ESLint only
  // covers code quality here.
  extends: ['eslint:recommended'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: 'tsconfig.json'
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ]
    },
    {
      files: ['*.cjs'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ]
}
