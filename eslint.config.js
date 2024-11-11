import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { sourceType: 'module', globals: { ...globals.node, ...globals.mocha } } },
  pluginJs.configs.recommended,
];
