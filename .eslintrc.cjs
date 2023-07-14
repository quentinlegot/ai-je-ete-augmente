/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:@intlify/vue-i18n/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true
  },
  rules: {
    '@intlify/vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: ['.js', '.vue']
      }
    ],
    '@intlify/vue-i18n/no-v-html': 'error'
  },
  settings: {
    'vue-i18n': {
      localeDir: './src/assets/translations/*.{json}',
      messageSyntaxVersion: '^9.0.0',
    },
  },
}
