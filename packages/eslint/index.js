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
    'react/jsx-filename-extension': [2, 'never'],
    'jsx-a11y/label-has-for': [2, {
      required: {
        components: ['label'] ,
        required : {
          some : ['nesting', 'id']
        }
      },
    }],
  },
}
