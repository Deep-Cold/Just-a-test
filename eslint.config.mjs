import { createRequire } from "node:module";
import eslintConfigPrettier from "eslint-config-prettier";

const require = createRequire(import.meta.url);
const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", ".npm-cache/**"],
  },
  ...nextCoreWebVitals,
  eslintConfigPrettier,
];

export default eslintConfig;
