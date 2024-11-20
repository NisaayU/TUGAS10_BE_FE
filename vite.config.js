import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174, // Port untuk frontend
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // URL backend
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
