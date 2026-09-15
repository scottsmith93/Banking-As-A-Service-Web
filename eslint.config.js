import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@carbon/react",
              message:
                "Do not use IBM Carbon. Sage uses `carbon-react` (Carbon by Sage).",
            },
          ],
          patterns: [
            {
              group: [
                "@mui/*",
                "@chakra-ui/*",
                "@radix-ui/*",
                "antd",
                "grommet",
                "semantic-ui-react",
                "react-bootstrap",
                "tailwindcss",
              ],
              message:
                "Do not add other UI libraries in this playground. Use `carbon-react` only.",
            },
          ],
        },
      ],
    },
  },
])
