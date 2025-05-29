import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5179,
    proxy: {
      '/api': 'http://localhost:3001', // Proxy API requests to your backend
    },
  },
})
