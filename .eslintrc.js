module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        '@typescript-eslint/no-var-requires': 0,
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'no-use-before-define': ['error', { functions: true, classes: true }],
        'no-console': 1, // Means warning
        'no-var': 'error',
        'prefer-const': 'error'
    }
}
