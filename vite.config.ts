import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { patchCssModules } from 'vite-css-modules'

export default defineConfig({
  plugins: [react(), patchCssModules()],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src')
    }
  }
})
