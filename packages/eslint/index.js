module.exports = {
  extends: ['airbnb'],
  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'wyze'
  ],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline'
      }
    ],
    'function-paren-newline': ['error', 'multiline'],
    'jsx-a11y/label-has-for': [
      'error',
      {
        components: ['label'],
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        tabWidth: 2
      }
    ],
    'multiline-ternary': ['error', 'always'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1
      }
    ],
    'react/jsx-filename-extension': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react/sort-prop-types': [
      'error',
      {
        sortShapeProp: true
      }
    ],
    semi: ['error', 'never'],
    'sort-keys': ['error'],
    'space-before-function-paren': ['error', 'always'],
    'wyze/sort-destructuring-keys': ['error', 'asc']
  }
}
