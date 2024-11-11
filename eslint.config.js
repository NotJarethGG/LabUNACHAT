import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",           // Define el tipo de módulo, si es necesario.
      globals: globals.node,           // Habilita las variables globales de Node.js
      ecmaVersion: "latest",           // Opcional: Define la versión de ECMAScript a utilizar
    },
  },
  pluginJs.configs.recommended,
];
