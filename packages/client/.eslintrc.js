module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    "plugin:vue-a11y/recommended",
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',

  ],
  plugins: [
    "vue-a11y",
    'simple-import-sort',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'simple-import-sort/sort': 'error',
    'import/order': 'off'

  }
}
