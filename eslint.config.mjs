// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Add this config item at the beginning to ignore your source files
  {
    ignores: [
      "**/*.js",  // Ignores all JavaScript files
      "**/*.jsx", // Ignores all JSX files
      "**/*.ts",  // Ignores all TypeScript files
      "**/*.tsx", // Ignores all TSX files
      // You can also add build output directories here if they are accidentally linted:
      // ".next/",
      // "dist/",
      // "build/"
    ]
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;