module.exports = {
  extends: ['airbnb'],
  rules: {
    semi: [2, 'never'],
    'space-before-function-paren': [2, 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
}
