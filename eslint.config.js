import js from '@eslint/js';
import globals from 'globals';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactImport from 'eslint-plugin-import';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...jest.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      sourceType: 'module',
    },
    settings: {
      react: {
        version: '18.3',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-import': reactImport,
      'react-refresh': reactRefresh,
      jest,
      prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...prettier.configs.recommended.rules,
      semi: 'warn',
      'prefer-const': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      quotes: ['warn', 'single'],
      'max-len': ['warn', { code: 100 }],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'prettier/prettier': 'warn',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
      'react-hooks/exhaustive-deps': 'off',
      'max-lines': ['warn', { max: 400, skipComments: true }],
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
