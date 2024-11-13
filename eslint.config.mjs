import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node, ...globals.mocha },
    },
    rules: {
      'indent': ['error', 2],               // Indentación de 2 espacios
      'quotes': ['error', 'single'],        // Comillas simples
      'semi': ['error', 'always'],          // Punto y coma obligatorio
      'linebreak-style': ['error', 'windows'], // Saltos de línea estilo windows (CRLF).
      'eol-last': ['error', 'always'],      // Exige línea en blanco al final del archivo
      'no-trailing-spaces': 'error',        // Prohíbe espacios al final de las líneas
      'no-console': 'off',                  // Permitir console.log
      'comma-spacing': ['error', {          // Espaciado después de comas
        before: false,
        after: true,
      }],
      'arrow-spacing': ['error', {          // Espaciado antes y después de =>
        before: true,
        after: true,
      }],
      'no-unused-vars': ['warn'],           // Advertencia para variables no usadas
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
  pluginJs.configs.recommended,
];
