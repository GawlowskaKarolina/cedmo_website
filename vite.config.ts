import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cedmo_website/',
  plugins: [react()],
  server: {port: 443 },
})