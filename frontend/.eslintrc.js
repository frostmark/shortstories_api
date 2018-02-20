module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'import', 'jsx-a11y', 'flowtype'],
  rules: {
    semi: ['error', 'never'],
    'react/no-did-mount-set-state': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'no-console': ['warn', { allow: ['info', 'error'] }],
    'consistent-return': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0
  },
  globals: {
    document: true,
    URL: true,
    window: true,
    fetch: true,
    navigator: true,
    Element: true,
    Class: true,
    React$Component: true,
    React$Element: true,
    SyntheticInputEvent: true,
    HTMLInputElement: true
  }
};
