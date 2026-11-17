import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // .astro files are checked by `astro check`; ESLint only covers plain JS/TS.
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.astro/',
      'public/',
      'src/content/',
      '**/*.astro'
    ]
  },
  // Formatting is Prettier's job (`npm run prettier:check`); ESLint only
  // covers code quality here.
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser }
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json'
      }
    }
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  }
)
