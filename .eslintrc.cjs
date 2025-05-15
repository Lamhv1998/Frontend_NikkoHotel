module.exports = {
  env: {
    browser: true,
    es2023: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'no-undef': 'off',
    'import/order': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto' // Tự động phát hiện và thiết lập ký tự xuống dòng
      }
    ]
  }
}
