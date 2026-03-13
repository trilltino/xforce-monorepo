import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', '')
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 1420,
      strictPort: true,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
