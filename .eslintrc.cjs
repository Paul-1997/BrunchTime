module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.ts', '.vue'],
      },
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue'],
  },
  plugins: ['vue'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'max-len': [
      'error',
      {
        code: 200,
        ignorePattern: '^<.*>$',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        bracketSpacing: true,
        singleQuote: true,
        printWidth: 120,
        trailingComma: 'all',
      },
    ],
  },
};
