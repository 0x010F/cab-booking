module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    "@vue/standard",
    "plugin:vue/strongly-recommended"
  ],
  rules: {
  "template-curly-spacing" : "off",
    "indent": ["error", 2, {
      "ignoredNodes": ["TemplateLiteral"]
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  parserOptions: {
    parser: 'babel-eslint'
  }
}