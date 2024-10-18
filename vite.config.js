import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],  // Enable React plugin for JSX support
  build: {
    rollupOptions: {
      input: {
        frame: path.resolve(__dirname, 'src/frame.js'),
        settings: path.resolve(__dirname, 'src/settings/index.jsx'),
        index: path.resolve(__dirname, 'src/index.js')
      },
      output: {
        dir: path.resolve(__dirname, 'dist'),
        entryFileNames: (chunk) => {
          if (chunk.name === 'settings') {
            return 'settings.js';  // Output settings.jsx as settings.js
          }
          return '[name].js';  // Default naming for other files
        },
        assetFileNames: '[name].[ext]',  // Default asset file names
      }
    },
    target: 'esnext',  // Target modern browsers
    minify: true,  // Enable default minification
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx'],  // Support .js and .jsx extensions
  },
  publicDir: 'public',  // Specify the directory for static assets
  server: {
    open: true,  // Automatically open the browser
    port: 3000,  // Default Vite dev server port
  },
  define: {
    'process.env': {}
  }
})
