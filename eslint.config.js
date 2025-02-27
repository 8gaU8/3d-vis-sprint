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
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: '{react,react-dom/**,react-router-dom}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@src/**',
              group: 'parent',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
]
