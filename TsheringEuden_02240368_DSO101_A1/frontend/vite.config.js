import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['fe-todolist-b.onrender.com', 'fe-todolist.onrender.com'],
  },
})