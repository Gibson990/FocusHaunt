import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// M0 mockup: minimal Vite + React setup. No extra plugins.
export default defineConfig({
  plugins: [react()],
})
