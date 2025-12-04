import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'

// Lê a versão do package.json
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

// Plugin para substituir variáveis no HTML
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace('%VITE_APP_VERSION%', packageJson.version)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), htmlPlugin()],
  base: '/rpg-texto/',
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Hash nos nomes dos arquivos para cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: undefined,
      }
    }
  }
})
