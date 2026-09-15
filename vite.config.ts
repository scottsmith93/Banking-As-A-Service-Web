import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Avoid silent port hopping (5174, 5175, etc.) which can make people
    // view stale instances in another tab and think their changes aren't live.
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
})
