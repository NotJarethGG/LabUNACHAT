import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",  // Cambiado a 'module' si usas `import`/`export`
      globals: globals.node, // Activa el entorno de Node.js
    },
    env: { node: true }, // Activa el entorno para Node.js
  },
  pluginJs.configs.recommended,
];
