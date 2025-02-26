import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

export default [
  // js files
  js.configs.recommended,
  // prettier
  prettier,
  // import
  importPlugin.flatConfigs.recommended,
  {
    ignores: ['.config/*', 'node_modules/*', 'dist/*'],
  },

  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        requestAnimationFrame: 'readonly',
      },
    },
    rules:{
      'no-console': 'off',
    },
  },
]
