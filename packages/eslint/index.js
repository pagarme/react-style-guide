module.exports = {
  extends: ['airbnb'],
  'env': {
    'browser': true,
    'jest': true,
  },
  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    'sort-destructure-keys'
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
    'function-paren-newline': ['error', 'consistent'],
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
    'multiline-ternary': ['error', 'always-multiline'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1
      }
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    semi: ['error', 'never'],
    'sort-keys': ['error'],
    'sort-vars': ['error'],
    'space-before-function-paren': ['error', 'always'],
    'sort-destructure-keys/sort-destructure-keys': ['error']
  }
}
